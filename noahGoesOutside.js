function sketchProc(processing) {
  with (processing) {
    var setup = function() {
      size(840, 640);
      frameRate(60);
    };

    // CONSTANTS:
    var DEBUG_MODE = false;
    var SCALE = 2;
    var CAMERA_BUFFER = 2;
    var GRAVITY = new PVector(0, 0.5, 0);
    var PLAYER_JUMPS = 2;
    var DEFAULT_MAXDX = 3;
    var DEFAULT_MAXDY = 10;
    var DEFAULT_FRICTION = 0.7;
    var DEFAULT_AIR_RES = 0.98;
    var DEFAULT_JUMP_VELOCITY = 8;
    var DEFAULT_FPS = 7;

    // GLOBALS:
    var gameInit = false;
    var keys = [];
    var spritesheets = {};
    var REQUESTED_IMAGES = [];

    // uc = undefined check. This is a quick
    var uc = function(x) {
      return x !== undefined;
    };

    var getImage = function(url) {
      var image = requestImage(url);
      REQUESTED_IMAGES.push(image);
      return image;
    };

    var checkRequestedImages = function(callback) {
      for (var i = 0; i < REQUESTED_IMAGES.length; i++) {
        if (REQUESTED_IMAGES[i].loaded) {
          REQUESTED_IMAGES.splice(i, 1);
        } else {
          setTimeout(checkRequestedImages, 100, callback);
          return false;
        }
      }
      if (callback) {
        callback();
      }
      return true;
    };

    var fetchSpritesheets = function(tilemap) {
      for (var j = 0; j < tilemap.tilesets.length; j++) {
        var tileset = tilemap.tilesets[j];
        if (tileset.image) {
          spritesheets[tileset.image] = getImage(tileset.image);
        }
      }
    };

    var getTileMap = function(tilemap) {
      tilemap.layers.forEach(function(layer) {
        var props = {};
        (layer.properties || []).forEach(function(prop) {
          props[prop.name] = prop.value;
        });
        layer.props = props;
      });
      tilemap.tilesets.forEach(function(tileset) {
        (tileset.tiles || []).forEach(function(tile) {
          var props = {};
          (tile.properties || []).forEach(function(prop) {
            props[prop.name] = prop.value;
          });
          tile.props = props;
        });
      });
      return tilemap;
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
            if (tileset.image) {
              var tileIdx = id - tileset.firstgid;
              var r = floor(tileIdx / tileset.columns);
              var c = tileIdx - r * tileset.columns;
              var x1 =
                tileset.margin + (tileset.tilewidth + tileset.spacing) * c;
              var y1 =
                tileset.margin + (tileset.tileheight + tileset.spacing) * r;
              var image = spritesheets[tileset.image].get(
                x1,
                y1,
                tileset.tilewidth,
                tileset.tileheight
              );
              var tile = (tileset.tiles || []).find(function(tile) {
                return tile.id === tileIdx;
              });
              tiles[id] = {
                image,
                width: tileset.tilewidth,
                height: tileset.tileheight,
                props: tile ? tile.props : {}
              };
              return;
            } else if (tileset.tiles) {
              tiles[id] = {
                image: loadImage(tile.image),
                width: tile.imagewidth,
                height: tile.imageheight,
                props: tile.props || {}
              };
              return;
            }
          }
        }
        console.error("ID " + id + " was not loaded.");
      });
      return tiles;
    };

    var getPoint = function(tilemap, pointName) {
      for (var i = 0; i < tilemap.layers.length; i++) {
        if (tilemap.layers[i].type === "objectgroup") {
          var layer = tilemap.layers[i];
          var point = layer.objects.find(function(x) {
            return x.name === pointName;
          });
          if (point) {
            return point;
          }
        }
      }
    };

    class Positionable {
      constructor(x, y, _width, _height, angle) {
        this.p = new PVector(x, y, 0);
        this.v = new PVector(0, 0, 0);
        this.w = _width;
        this.h = _height;
        this.a = angle;
        this.maxdx = DEFAULT_MAXDX;
        this.maxdy = DEFAULT_MAXDY;
        this.friction = DEFAULT_FRICTION;
        this.airRes = DEFAULT_AIR_RES;
        this.jumpVelocity = -DEFAULT_JUMP_VELOCITY;
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
          max(min(this.v.y + vec.y, this.maxdy), -this.maxdy),
          0
        );
      }

      updatePosition() {
        this.p.add(this.v);
        this.v.mult(this.falling ? this.airRes : this.friction);
      }

      moving() {
        return this.v.mag() > 0.1;
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

      getCollisions(tilemap, tiles) {
        var cps = this.collisionPoints();
        var collisions = {};
        Object.keys(cps).forEach(function(k) {
          var tx = floor(cps[k].x / tilemap.tilewidth);
          var ty = floor(cps[k].y / tilemap.tileheight);
          if (tx < 0 || tx >= tilemap.width) {
            collisions[k] = { x: tx, y: ty, collideTop: false, collide: true };
            return;
          }
          var tile = null;
          var tileLayer = null;
          tilemap.layers.find(function(layer) {
            if (layer.type !== "tilelayer" || layer.props.background) {
              return false;
            }
            var id = layer.data[ty * layer.height + tx];
            if (id !== 0) {
              tile = tiles[id];
              tileLayer = layer;
              return true;
            }
            return false;
          });
          collisions[k] = { x: tx, y: ty, collideTop: false, collide: false };
          if (tile) {
            collisions[k] = {
              ...collisions[k],
              collideTop:
                tileLayer.props.collideTop ||
                tileLayer.props.collide ||
                tile.props.collideTop ||
                tile.props.collide,
              collide: tileLayer.props.collide || tile.props.collide
            };
          }
        }, this);
        return collisions;
      }

      handleCollision(tilemap, tiles) {
        var fallingDown = this.falling && this.v.y > 0;
        var jumpingUp = this.falling && this.v.y < 0;
        var movingLeft = this.v.x < 0;
        var movingRight = this.v.x > 0;
        var c = this.getCollisions(tilemap, tiles);
        if (movingLeft && (c.ml.collide || c.tl.collide)) {
          this.collideLeft();
          return true;
        }
        if (movingRight && (c.mr.collide || c.tr.collide)) {
          this.collideRight();
          return true;
        }
        if (jumpingUp && !c.ml.collide && (c.tl.collide || c.tr.collide)) {
          this.collideTop();
          return true;
        }
        if (fallingDown && (c.bl.collideTop || c.br.collideTop)) {
          this.collideBottom();
          return true;
        }
        if (!this.falling && !c.bl.collideTop && !c.br.collideTop) {
          return this.startFalling();
        }
        return false;
      }

      collideLeft() {
        this.p.x = ceil(this.p.x / tilemap.tilewidth) * tilemap.tilewidth;
        this.v.x = 0;
      }

      collideRight() {
        this.p.x =
          ceil(this.p.x / tilemap.tilewidth) * tilemap.tilewidth - this.w - 1;
        this.v.x = 0;
      }

      collideTop() {
        this.p.y =
          floor(this.p.y / tilemap.tileheight) * tilemap.tileheight +
          this.h +
          1;
        this.v.y = 0;
      }

      collideBottom() {
        this.falling = false;
        this.p.y = floor(this.p.y / tilemap.tileheight) * tilemap.tileheight;
        this.v.y = 0;
      }

      startFalling() {
        this.falling = true;
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

    class Character extends Positionable {
      constructor(x, y, w, h, walkImgs, jumpImgs) {
        super(x, y, w, h, 0);
        this.walkImgs = walkImgs;
        this.jumpImgs = jumpImgs;
        this.fps = DEFAULT_FPS;
        this.animationFrame = 0;
        this.img = this.walkImgs[this.animationFrame];
        this.animation = "walk";
        this.dir = LEFT;
      }

      jump() {
        this.v.y = this.jumpVelocity;
        this.falling = true;
      }

      moveLeft() {
        this.addVelocity(new PVector(-0.8, 0, 0));
        this.dir = LEFT;
      }

      moveRight() {
        this.addVelocity(new PVector(0.8, 0, 0));
        this.dir = RIGHT;
      }

      stepAnimation() {
        if (this.falling) {
          if (this.animation === "walk") {
            this.animation = "jump";
            this.animationFrame = 0;
            this.img = this.jumpImgs[this.animationFrame];
          } else {
            if (frameCount % floor(60 / this.fps) === 0) {
              this.animationFrame =
                (this.animationFrame + 1) % this.jumpImgs.length;
              this.img = this.jumpImgs[this.animationFrame];
            }
          }
        } else if (!this.moving()) {
          this.animation = "walk";
          this.animationFrame = 0;
          this.img = this.walkImgs[this.animationFrame];
        } else {
          if (this.animation !== "walk") {
            this.animation = "walk";
            this.animationFrame = 0;
            this.img = this.walkImgs[this.animationFrame];
          } else {
            if (frameCount % floor(60 / this.fps) === 0) {
              this.animationFrame =
                (this.animationFrame + 1) % this.walkImgs.length;
              this.img = this.walkImgs[this.animationFrame];
            }
          }
        }
      }

      draw() {
        if (DEBUG_MODE) {
          super.draw();
        }
        this.stepAnimation();
        pushMatrix();
        imageMode(CENTER);
        translate(this.p.x + this.w / 2, this.p.y - this.h / 2);
        if (this.dir === LEFT) {
          scale(-1, 1);
        }
        image(this.img, 0, 0);
        imageMode(CORNER);
        popMatrix();
      }
    }

    class Player extends Character {
      constructor(x, y, w, h, walkImgs, jumpImgs) {
        super(x, y, w, h, walkImgs, jumpImgs);
        this.jumps = PLAYER_JUMPS;
      }

      update(tilemap, tiles) {
        if (this.falling) {
          this.addVelocity(GRAVITY);
        }
        this.updatePosition();
        while (this.handleCollision(tilemap, tiles));
        this.handleInput();
      }

      handleInput() {
        if (keys[LEFT]) {
          this.moveLeft();
        } else if (keys[RIGHT]) {
          this.moveRight();
        }
        if (keys[UP] && (!this.falling || this.jumps > 0)) {
          keys[UP] = false;
          this.jumps--;
          this.jump();
        }
      }

      handleCollision(tilemap, tiles) {
        if (super.handleCollision(tilemap, tiles)) {
          return true;
        }
        return false;
      }

      collideBottom() {
        super.collideBottom();
        this.resetJumps();
      }

      resetJumps() {
        this.jumps = PLAYER_JUMPS;
      }
    }

    var Camera = function(scale_, buffer) {
      this.x = 0;
      this.y = 0;
      this.cx = 0;
      this.cy = 0;
      this.rx = 0;
      this.ry = 0;
      this.r = 0;
      this.c = 0;
      this.scale = scale_;
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

    var NOAH_WALK_IMGS = [
      getImage("NGO_Noah/noah_walk_0.png"),
      getImage("NGO_Noah/noah_walk_1.png"),
      getImage("NGO_Noah/noah_walk_2.png"),
      getImage("NGO_Noah/noah_walk_3.png")
    ];
    var NOAH_JUMP_IMGS = [getImage("NGO_Noah/noah_walk_1.png")];
    var NGO_TITLE = getImage("NGO_title.png");
    var NGO_INSTRUCTIONS = getImage("NGO_instructions.png");
    var NGO_INSTRUCTIONS_SCREEN = getImage("NGO_instructions_screen.png");
    var NGO_CREATOR = getImage("NGO_creator.png");
    var NGO_COMING_SOON = getImage("NGO_coming_soon.png");

    var tiles, noah, camera;
    var tilemap = getTileMap(TileMaps.HomeScreenMap);
    var init = function() {
      tiles = getTiles(tilemap);
      var start = getPoint(tilemap, "start") || { x: 100, y: 100 };
      noah = new Player(
        start.x,
        start.y,
        18,
        18,
        NOAH_WALK_IMGS,
        NOAH_JUMP_IMGS
      );
      camera = new Camera(SCALE, CAMERA_BUFFER);
      gameInit = true;
    };
    fetchSpritesheets(tilemap);
    checkRequestedImages(init);

    var showInstructions = false;
    var level = "start";
    var exit = getPoint(tilemap, "exit") || { x: 0, y: height };

    var keyPressed = function() {
      keys[keyCode] = true;
      keys[key] = true;
      if (keys["?"]) {
        showInstructions = !showInstructions;
      }
      if (keys[" "]) {
        var exitLoc = new PVector(exit.x, exit.y, 0);
        console.log(exitLoc, noah.p.dist(exitLoc));
        if (noah.p.dist(exitLoc) < tilemap.tilewidth) {
          level = "blank";
        }
      }
    };

    var keyReleased = function() {
      keys[keyCode] = false;
      keys[key] = false;
    };

    var draw = function() {
      if (!gameInit) return;
      noah.update(tilemap, tiles);
      camera.update(noah, tilemap);

      pushMatrix();
      background(0, 0, 0);
      switch (level) {
        case "start": {
          camera.show();
          tilemap.layers.forEach(function(layer) {
            drawLayer(camera, layer, tilemap, tiles);
          });
          noah.draw();
          break;
        }
        case "blank": {
          image(
            NGO_COMING_SOON,
            width / 2 - NGO_COMING_SOON.width / 2,
            height / 2 - NGO_COMING_SOON.height / 2
          );
          break;
        }
      }
      popMatrix();
      if (level === "start") {
        image(NGO_TITLE, width / 2 - NGO_TITLE.width / 2, 10);
        image(NGO_INSTRUCTIONS, width / 2 - NGO_INSTRUCTIONS.width / 2, 280);
        image(NGO_CREATOR, width / 2 - NGO_CREATOR.width / 2, 330);
      }
      if (showInstructions) {
        fill(20, 20, 20, 220);
        noStroke();
        rect(20, 40, width - 40, height - 80);
        rect(40, 20, width - 80, height - 40);
        image(NGO_INSTRUCTIONS_SCREEN, 40, 40);
      }
    };
  }
}
