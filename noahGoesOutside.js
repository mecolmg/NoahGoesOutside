function sketchProc(processing) {
  with (processing) {
    var setup = function() {
      size(700, 400);
      frameRate(60);
    };

    // CONSTANTS:
    var SCALE = 0.8;
    var CAMERA_BUFFER = 2;
    var JUMP_VELOCITY = 16;
    var GRAVITY = new PVector(0, 1);
    var DEFAULT_MAXDX = 6;
    var DEFAULT_MAXDY = 20;
    var DEFAULT_FRICTION = 0.7;
    var DEFAULT_AIR_RES = 0.98;

    // GLOBALS:
    var keys = [];

    // uc = undefined check. This is a quick
    var uc = function(x) {
      return x !== undefined;
    };

    var getTiles = function(tilemap) {
      var tileIDs = new Set();
      for (var i = 0; i < tilemap.layers.length; i++) {
        if (tilemap.layers[i].type === "tilelayer") {
          tileIDs = new Set([...tileIDs, ...tilemap.layers[i].data]);
        }
      }
      tileIDs.delete(0);

      var tiles = {};
      tileIDs.forEach(function(id) {
        for (var j = 0; j < tilemap.tilesets.length; j++) {
          var tileset = tilemap.tilesets[j];
          if (
            id >= tileset.firstgid &&
            id < tileset.firstgid + tileset.tilecount
          ) {
            var tile = tileset.tiles[id - tileset.firstgid];
            var props = {};
            if (tile.properties) {
              tile.properties.forEach(function(prop) {
                props[prop.name] = prop.value;
              });
            }
            tiles[id] = {
              image: loadImage(tile.image),
              width: tile.imagewidth,
              height: tile.imageheight,
              props
            };
            console.log(tiles[id]);
            return;
          }
        }
        console.error("ID " + id + " was not loaded.");
      });
      return tiles;
    };

    var getBoundaries = function(layer) {
      if (layer.type !== "objectgroup") {
        console.error("Layer '" + layer.name + "' is not of type objectgroup.");
        return [];
      }
      var boundaries = [];
      for (var i = 0; i < layer.objects.length; i++) {
        var obj = layer.objects[i];
        if (
          uc(obj.x) &&
          uc(obj.y) &&
          uc(obj.width) &&
          uc(obj.height) &&
          uc(obj.rotation)
        ) {
          boundaries.push(
            new Boundary(
              obj.x,
              obj.y,
              obj.width,
              -obj.height,
              (obj.rotation / 180) * Math.PI
            )
          );
        } else {
          console.warn("Invalid boundary object in layer.", obj);
        }
      }
      return boundaries;
    };

    class Positionable {
      constructor(x, y, _width, _height, angle) {
        this.p = new PVector(x, y);
        this.v = new PVector(0, 0);
        this.w = _width;
        this.h = _height;
        this.a = angle;
        this.maxdx = DEFAULT_MAXDX;
        this.maxdy = DEFAULT_MAXDY;
        this.friction = DEFAULT_FRICTION;
        this.airRes = DEFAULT_AIR_RES;
        this.falling = false;
        this.cpOffsets = {
          tl: { x: 0, y: -this.h },
          tm: { x: this.w / 2, y: -this.h },
          tr: { x: this.w, y: -this.h },
          ml: { x: 0, y: -this.h / 2 },
          mm: { x: this.w / 2, y: -this.h / 2 },
          mr: { x: this.w, y: -this.h / 2 },
          bl: { x: 0, y: 0 },
          br: { x: this.w, y: 0 },
          bm: { x: this.w / 2, y: 0 }
        };
      }

      addVelocity(vec) {
        this.v.set(
          max(min(this.v.x + vec.x, this.maxdx), -this.maxdx),
          max(min(this.v.y + vec.y, this.maxdy), -this.maxdy)
        );
      }

      updatePosition() {
        this.p.add(this.v);
        this.v.mult(this.falling ? this.airRes : this.friction);
      }

      collisionPoints() {
        var cps = {};
        Object.keys(this.cpOffsets).forEach(function(k) {
          cps[k] = {
            x: this.p.x + this.cpOffsets[k].x,
            y: this.p.y + this.cpOffsets[k].y
          };
        }, this);
        return cps;
      }

      draw() {
        pushMatrix();
        translate(this.p.x, this.p.y);
        rotate(this.a);
        stroke(255, 0, 0);
        strokeWeight(2);
        noFill();
        rect(0, 0, this.w, -this.h);
        popMatrix();
      }
    }

    class Boundary extends Positionable {
      constructor(x, y, _width, _height, angle) {
        super(x, y, _width, _height, angle);
      }
    }

    class Player extends Positionable {
      constructor(x, y, w, h, img) {
        super(x, y, w, h, 0);
        this.v = new PVector(0, 0);
        this.w = w; // Width
        this.h = h; // Height
        this.img = img; // Image
        this.jumps = 2;
      }

      update(tilemap, tiles) {
        if (this.falling) {
          this.addVelocity(GRAVITY);
          console.log(this.v.x, this.v.y, this.jumps);
        }
        this.updatePosition();
        while (this.checkCollision(tilemap, tiles));
        if (keys[LEFT]) {
          this.addVelocity(new PVector(-2, 0));
          // this.p.x -= 4;
        } else if (keys[RIGHT]) {
          this.addVelocity(new PVector(2, 0));
          // this.p.x += 4;
        }
        if (keys[UP] && (!this.falling || this.jumps > 0)) {
          keys[UP] = false;
          this.jumps--;
          this.v.y = -JUMP_VELOCITY;
        }
      }

      checkCollision(tilemap, tiles) {
        var fallingDown = this.falling && this.v.y > 0;
        var movingLeft = this.v.x < 0;
        var movingRight = this.v.x > 0;
        var cps = this.collisionPoints();
        var c = {};
        Object.keys(cps).forEach(function(k) {
          var tx = floor(cps[k].x / tilemap.tilewidth);
          var ty = floor(cps[k].y / tilemap.tileheight);
          var tile = null;
          tilemap.layers.find(function(layer) {
            if (layer.type !== "tilelayer") {
              return false;
            }
            var id = layer.data[ty * layer.height + tx];
            if (id !== 0) {
              tile = tiles[id];
              return true;
            }
            return false;
          });
          c[k] = { x: tx, y: ty, collideTop: false, collide: false };
          if (tile) {
            c[k] = {
              ...c[k],
              collideTop: tile.props.collideTop || tile.props.collide,
              collide: tile.props.collide
            };
            if (tile.props.collide && ["tr", "mr", "tl", "ml"].includes(k)) {
              console.log(this.v.x, tile, k, c[k]);
            }
          }
        }, this);
        if (movingLeft && (c.ml.collide || c.tl.collide)) {
          this.p.x = ceil(this.p.x / tilemap.tilewidth) * tilemap.tilewidth + 1;
          this.v.x = 0;
          console.log("here");
          return true;
        }
        if (movingRight && (c.mr.collide || c.tr.collide)) {
          this.p.x =
            floor(this.p.x / tilemap.tilewidth) * tilemap.tilewidth - 1;
          this.v.x = 0;
          return true;
        }
        if (
          fallingDown &&
          (c.bl.collideTop || c.br.collideTop) &&
          !(c.ml.collideTop || c.mr.collideTop)
        ) {
          this.falling = false;
          this.p.y = floor(this.p.y / tilemap.tileheight) * tilemap.tileheight;
          this.v.y = 0;
          this.jumps = 2;
          return true;
        }
        if (!this.falling && !c.bl.collideTop && !c.br.collideTop) {
          this.falling = true;
        }
        return false;
      }
    }

    var Camera = function(_scale, buffer) {
      this.x = 0;
      this.y = 0;
      this.cx = 0;
      this.cy = 0;
      this.rx = 0;
      this.ry = 0;
      this.r = 0;
      this.c = 0;
      this.scale = _scale;
      this.buffer = buffer;
      this.update = function(player, map) {
        var mapW = map.width * map.tilewidth,
          mapH = map.height * map.tileheight,
          pX = player.p.x,
          pY = player.p.y;
        this.cx = min(
          max(-mapW + width / this.scale, -pX + width / (2 * this.scale)),
          0
        );
        this.cy = min(
          max(-mapH + height / this.scale, -pY + height / (2 * this.scale)),
          0
        );
        this.x = round((-this.cx + width / (2 * this.scale)) / map.tilewidth);
        this.y = round((-this.cy + height / (2 * this.scale)) / map.tileheight);
        this.rx = ceil(width / (2 * this.scale) / map.tilewidth) + this.buffer;
        this.ry =
          ceil(height / (2 * this.scale) / map.tileheight) + this.buffer;
      };
      this.show = function() {
        scale(this.scale);
        translate(this.cx, this.cy);
      };
    };

    var drawLayer = function(camera, layer, tilemap, tiles) {
      var r = min(camera.y + camera.ry, layer.height - 1);
      for (; r >= max(camera.y - camera.ry, 0); r--) {
        var c = max(camera.x - camera.rx, 0);
        for (; c < min(camera.x + camera.rx, layer.width); c++) {
          var id = layer.data[r * layer.height + c];
          if (id !== 0) {
            var tile = tiles[id];
            var x = c * tilemap.tilewidth;
            var y = (r + 1) * tilemap.tileheight - tile.height;
            image(tile.image, x, y);
          }
        }
      }
    };

    console.log(TileMaps);

    var tilemap = TileMaps.TileMap1;
    var tiles = getTiles(tilemap);
    // var boundaries = getBoundaries(
    //   tilemap.layers.find(function(x) {
    //     return x.name === "colision_rects";
    //   })
    // );
    var player1 = new Player(105, 35, 70, 70, null);
    var camera = new Camera(SCALE, CAMERA_BUFFER);

    var keyPressed = function() {
      keys[keyCode] = true;
      keys[key] = true;
    };

    var keyReleased = function() {
      keys[keyCode] = false;
      keys[key] = false;
    };

    var draw = function() {
      player1.update(tilemap, tiles);
      camera.update(player1, tilemap);

      pushMatrix();
      background(152, 229, 236);
      camera.show();
      tilemap.layers.forEach(function(layer) {
        drawLayer(camera, layer, tilemap, tiles);
      });
      player1.draw();
      // boundaries.forEach(function(boundary) {
      //   boundary.draw();
      // });
      popMatrix();
    };
  }
}
