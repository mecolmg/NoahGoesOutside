/**
 * Final Project - Noah Goes Outside
 * Name: Colm Gallagher
 * Date: 11/16/2018
 *
 * This project is a 2D platformer with
 * the added mechanic that the main character
 * Noah has a grappling gun which he can use
 * to navigate and protect himself from enemies.
 *
 * The code is heavily OOP based making it easy
 * to add new enemies, items, etc.
 *
 * The tilemap is created using Tiled, and most
 * game data for each levels is dynamically loaded
 * from these maps to reduce unecessary code.
 *
 * Game art is from:
 * https://opengameart.org/content/platformer-art-pixel-redux
 */
function sketchProc(processing) {
  with (processing) {
    var setup = function() {
      size(840, 640);
      frameRate(60);
    };

    var REQUESTED_IMAGES = [];

    var getImage = function(url) {
      var image = requestImage(url);
      REQUESTED_IMAGES.push(image);
      return image;
    };

    // CONSTANTS:
    var DEBUG_MODE = false;
    var SCALE = 2;
    var CAMERA_BUFFER = 2;
    var GRAVITY = new PVector(0, 0.5, 0);
    var PLAYER_JUMPS = 1;
    var DEFAULT_MAXDX = 2.5;
    var DEFAULT_MAXDY = 5;
    var DEFAULT_FRICTION = 0.7;
    var DEFAULT_AIR_RES = 0.98;
    var DEFAULT_JUMP_VELOCITY = 7;
    var DEFAULT_FPS = 7;
    var MAX_GRAPPLE_DIST = 100;
    var GRAPPLE_SPEED = 10;
    /* @pjs font="VT323-Regular.ttf"; */
    var NGO_FONT = createFont("VT323", 32);
    var NOAH_WALK_IMGS = [
      getImage("NGO_Noah/noah_walk_0.png"),
      getImage("NGO_Noah/noah_walk_1.png"),
      getImage("NGO_Noah/noah_walk_2.png"),
      getImage("NGO_Noah/noah_walk_3.png")
    ];
    var NOAH_JUMP_IMGS = [getImage("NGO_Noah/noah_walk_1.png")];
    var NOAH_DIALOG_IMG = getImage("NGO_Noah/noah_dialog_0.png");
    var FLY_WALK_IMGS = [
      getImage("NGO_Fly/fly_0.png"),
      getImage("NGO_Fly/fly_1.png")
    ];
    var FLY_JUMP_IMGS = [getImage("NGO_Fly/fly_0.png")];
    var HUD_LIVES_IMG = NOAH_JUMP_IMGS[0];
    var HUD_COIN_IMG = getImage("NGO_HUD/hud_coin.png");
    var NGO_TITLE = getImage("NGO_title.png");
    var NGO_INSTRUCTIONS = getImage("NGO_instructions.png");
    var NGO_INSTRUCTIONS_SCREEN = getImage("NGO_instructions_screen.png");
    var NGO_CREATOR = getImage("NGO_creator.png");
    var NGO_COMING_SOON = getImage("NGO_coming_soon.png");

    // GLOBALS:
    var gameInit = false;
    var keys = [];
    var dialogs = [];
    var spritesheets = {};
    var tilemap, tiles, noah, camera, start, doors, enemies, grapplePoints, hud;
    var lives = 3,
      coins = 0,
      score = 0;
    var showInstructions = false;
    var level = "HomeScreenMap";

    // uc = undefined check. This is a quick
    var uc = function(x) {
      return x !== undefined;
    };

    Number.prototype.pad = function(size) {
      var s = String(this);
      while (s.length < (size || 2)) {
        s = "0" + s;
      }
      return s;
    };

    var mod = function(n, m) {
      return ((n % m) + m) % m;
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
        if (tileset.image && !spritesheets[tileset.image]) {
          spritesheets[tileset.image] = getImage(tileset.image);
        }
      }
    };

    var loadLevel = function(levelName) {
      level = levelName;
      if (TileMaps[levelName]) {
        gameInit = false;
        tilemap = getTileMap(TileMaps[level]);
        start = getPoint(tilemap, "start") || { x: 100, y: 100 };
        doors = getDoors(tilemap);
        enemies = getEnemies(tilemap);
        grapplePoints = getGrapplePoints(tilemap);
        dialogs = getDialogs(tilemap);
        var init = function() {
          tiles = getTiles(tilemap);
          noah = new Player(
            start.x,
            start.y,
            18,
            18,
            start.props.dir === 1 ? RIGHT : LEFT,
            NOAH_WALK_IMGS,
            NOAH_JUMP_IMGS
          );
          camera = new Camera(SCALE, CAMERA_BUFFER);
          hud = new HUD();
          gameInit = true;
        };
        fetchSpritesheets(tilemap);
        checkRequestedImages(init);
      }
    };

    var restartLevel = function() {
      lives--;
      if (lives < 0) {
        level = "gameover";
        return;
      }
      noah = new Player(
        start.x,
        start.y,
        18,
        18,
        start.props.dir === 1 ? RIGHT : LEFT,
        NOAH_WALK_IMGS,
        NOAH_JUMP_IMGS
      );
      camera = new Camera(SCALE, CAMERA_BUFFER);
      enemies = getEnemies(tilemap);
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

    var getDoors = function(tilemap) {
      var doors = [];
      for (var i = 0; i < tilemap.layers.length; i++) {
        if (tilemap.layers[i].type === "objectgroup") {
          var layer = tilemap.layers[i];
          var doorPoints = [];
          for (var j = 0; j < layer.objects.length; j++) {
            var point = layer.objects[j];
            point.props = {};
            if (point.properties) {
              point.properties.forEach(function(prop) {
                point.props[prop.name] = prop.value;
              });
            }
            if (point.props.door) {
              doorPoints.push(point);
            }
          }
          var layerDoors = doorPoints.map(function(doorPoint) {
            return {
              ...doorPoint,
              ...doorPoint.props
            };
          });
          doors = [...doors, ...layerDoors];
        }
      }
      return doors;
    };

    var getEnemies = function(tilemap) {
      var enemies = [];
      for (var i = 0; i < tilemap.layers.length; i++) {
        if (tilemap.layers[i].props.enemies) {
          var layer = tilemap.layers[i];
          for (var j = 0; j < layer.objects.length; j++) {
            var obj = layer.objects[j];
            obj.props = {};
            if (obj.properties) {
              obj.properties.forEach(function(prop) {
                obj.props[prop.name] = prop.value;
              });
            }
            switch (obj.props.type) {
              case "fly": {
                enemies.push(
                  new Fly(
                    obj.x,
                    obj.y,
                    obj.props.dx * tilemap.tilewidth,
                    obj.props.dy * tilemap.tileheight
                  )
                );
                break;
              }
            }
          }
        }
      }
      return enemies;
    };

    var getGrapplePoints = function(tilemap) {
      var grapplePoints = [];
      for (var i = 0; i < tilemap.layers.length; i++) {
        if (tilemap.layers[i].props.grapplePoints) {
          var layer = tilemap.layers[i];
          for (var j = 0; j < layer.objects.length; j++) {
            var obj = layer.objects[j];
            obj.props = {};
            if (obj.properties) {
              obj.properties.forEach(function(prop) {
                obj.props[prop.name] = prop.value;
              });
            }
            grapplePoints.push(obj);
          }
        }
      }
      return grapplePoints;
    };

    var getDialogs = function(tilemap) {
      var dialogs = [];
      for (var i = 0; i < tilemap.layers.length; i++) {
        if (tilemap.layers[i].props.dialogs) {
          var layer = tilemap.layers[i];
          for (var j = 0; j < layer.objects.length; j++) {
            var obj = layer.objects[j];
            obj.props = {};
            if (obj.properties) {
              obj.properties.forEach(function(prop) {
                obj.props[prop.name] = prop.value;
              });
            }
            dialogs.push(
              new Dialog(obj.props.text, obj.props.character, obj.props.id)
            );
          }
        }
      }
      console.log(dialogs);

      return dialogs.sort(function(a, b) {
        return a.id > b.id;
      });
    };

    var getActiveGP = function(grapplePoints, point, dir) {
      var minDist = -1;
      var grapplePoint;
      grapplePoints.forEach(function(gp) {
        var dist = point.dist(new PVector(gp.x, gp.y, 0));
        var pDir = PVector.sub(gp, point).x > 0 ? RIGHT : LEFT;
        if (
          pDir === dir &&
          dist < MAX_GRAPPLE_DIST &&
          (minDist === -1 || dist < minDist)
        ) {
          minDist = dist;
          grapplePoint = gp;
        }
      });
      return grapplePoint;
    };

    var atDoor = function(loc, doors) {
      for (var i = 0; i < doors.length; i++) {
        var doorLoc = new PVector(doors[i].x, doors[i].y, 0);
        if (loc.dist(doorLoc) < tilemap.tilewidth) {
          return doors[i];
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

      intersects(o) {
        return this.intersectsBox(o.p.x, o.p.y, o.w, o.h);
      }

      intersectsBox(x, y, w, h) {
        if (
          this.p.x - this.w / 2 > x + w / 2 ||
          x - w / 2 > this.p.x + this.w / 2
        ) {
          return false;
        }
        if (
          this.p.y - this.h / 2 > y + h / 2 ||
          y - h / 2 > this.p.y + this.h / 2
        ) {
          return false;
        }
        return true;
      }

      containsPoint(p) {
        return (
          p.x >= this.p.x &&
          p.x <= this.p.x + this.w &&
          p.y <= this.p.y &&
          p.y >= this.p.y - this.h
        );
      }

      centerPoint() {
        return new PVector(this.p.x + this.w / 2, this.p.y - this.h / 2, 0);
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
            var id = layer.data[ty * layer.width + tx];
            if (id !== 0) {
              if (layer.props.collectibles) {
                this.handleCollection(tiles[id], layer, tx, ty);
                return false;
              }
              tile = tiles[id];
              tileLayer = layer;
              return true;
            }
            return false;
          }, this);
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

      handleCollection(tile, layer, tx, ty) {}

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
      constructor(x, y, w, h, dir, walkImgs, jumpImgs) {
        super(x, y, w, h, 0);
        this.walkImgs = walkImgs;
        this.jumpImgs = jumpImgs;
        this.fps = DEFAULT_FPS;
        this.animationFrame = 0;
        this.img = this.walkImgs[this.animationFrame];
        this.animation = "walk";
        this.dir = dir;
        this.imageDir = RIGHT;
        this.xAcc = 0.8;
      }

      jump() {
        this.v.y = this.jumpVelocity;
        this.falling = true;
      }

      moveLeft() {
        this.addVelocity(new PVector(-this.xAcc, 0, 0));
        this.dir = LEFT;
      }

      moveRight() {
        this.addVelocity(new PVector(this.xAcc, 0, 0));
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
        if (this.dir !== this.imageDir) {
          scale(-1, 1);
        }
        image(this.img, 0, 0);
        imageMode(CORNER);
        popMatrix();
      }
    }

    class Enemy extends Character {
      constructor(x, y, w, h, dir, walkImgs, jumpImgs) {
        super(x, y, w, h, dir, walkImgs, jumpImgs);
        this.initialized = false;
        this.dead = false;
      }

      hit() {
        this.dead = true;
      }
    }

    class Fly extends Enemy {
      constructor(x, y, dx, dy) {
        super(
          x,
          y,
          19,
          14,
          dx > 0 ? RIGHT : LEFT,
          FLY_WALK_IMGS,
          FLY_WALK_IMGS
        );
        this.pInit = new PVector(x, y, 0);
        this.dx = dx;
        this.dy = dy;
        this.v.set(Math.sign(dx), Math.sign(dy), 0);
        this.imageDir = LEFT;
        this.friction = 1;
        this.airRes = 1;
      }

      update(tilemap, tiles) {
        this.updatePosition();
        while (this.handleCollision(tilemap, tiles));
        if (this.dy === 0) {
          this.p.y = this.pInit.y + 6 * sin(frameCount / 20);
        }
        if (this.p.x > this.pInit.x + abs(this.dx) && this.v.x > -1) {
          this.v.x += -0.1;
          this.dir = LEFT;
        } else if (this.p.x < this.pInit.x - abs(this.dx) && this.v.x < 1) {
          this.v.x += 0.1;
          this.dir = RIGHT;
        }
        if (this.p.y > this.pInit.y + abs(this.dy) && this.v.y > 0) {
          this.v.y = -1;
        } else if (this.p.y < this.pInit.y - abs(this.dy) && this.v.y < 0) {
          this.v.y = 1;
        }
      }
    }

    class Player extends Character {
      constructor(x, y, w, h, dir, walkImgs, jumpImgs) {
        super(x, y, w, h, dir, walkImgs, jumpImgs);
        this.jumps = PLAYER_JUMPS;
        this.hook = new PVector(x, y, 0);
        this.grappleTarget = new PVector(x, y, 0);
        this.grappling = false;
        this.hooked = false;
        this.coins = 0;
        this.score = 0;
        this.gems = [];
        this.collectPoints = new Set();
      }

      update(tilemap, tiles, enemies, grapplePoints) {
        if (this.falling) {
          this.addVelocity(GRAVITY);
        }
        if (this.grappling) {
          this.updateGrapple(enemies, grapplePoints);
        }
        this.updatePosition(enemies, grapplePoints);
        while (this.handleCollision(tilemap, tiles));
        this.handleInput(grapplePoints);
      }

      draw() {
        if (this.grappling) {
          stroke(70, 70, 70);
          strokeWeight(2);
          line(
            this.p.x + this.w / 2,
            this.p.y - this.h / 2,
            this.hook.x,
            this.hook.y
          );
          stroke(100, 100, 100);
          line(
            this.hook.x - 2,
            this.hook.y - 2,
            this.hook.x + 2,
            this.hook.y + 2
          );
          line(
            this.hook.x - 2,
            this.hook.y + 2,
            this.hook.x + 2,
            this.hook.y - 2
          );
          line(this.hook.x - 3, this.hook.y, this.hook.x + 3, this.hook.y);
          line(this.hook.x, this.hook.y - 3, this.hook.x, this.hook.y + 3);
        }
        super.draw();
      }

      upPressed() {
        var pressed = keys[UP] || keys["w"] || keys["W"];
        return pressed;
      }
      resetUp() {
        keys[UP] = false;
        keys["W"] = false;
        keys["w"] = false;
      }

      leftPressed() {
        return keys[LEFT] || keys["a"] || keys["A"];
      }

      rightPressed() {
        return keys[RIGHT] || keys["d"] || keys["D"];
      }

      downPressed() {
        return keys[DOWN] || keys["s"] || keys["S"];
      }

      grapplePressed() {
        var pressed = keys[" "];
        if (pressed) {
          keys[" "] = false;
        }
        return pressed;
      }

      grapple(grapplePoints) {
        if (this.grappling) {
          this.grappling = false;
          this.hooked = false;
          return;
        }
        var grapplePoint = getActiveGP(
          grapplePoints,
          this.centerPoint(),
          this.dir
        );
        if (grapplePoint !== undefined) {
          this.grapplingTarget = new PVector(grapplePoint.x, grapplePoint.y, 0);
          this.hook = this.centerPoint();
          this.grappling = true;
        } else {
          this.grapplingTarget = PVector.add(
            this.p,
            new PVector(this.dir === RIGHT ? width : -width, 0, 0)
          );
          this.hook = this.centerPoint();
          this.grappling = true;
        }
      }

      updateGrapple(enemies, grapplePoints) {
        if (this.hooked) {
          this.ropeLength = max(0, this.ropeLength - 5);
          if (this.ropeLength === 0) {
            this.hooked = false;
            this.grappling = false;
          }
          var playerPoint = new PVector(
            this.p.x + (this.dir === RIGHT ? 0 : this.w),
            this.p.y,
            0
          );
          var dist = round(this.hook.dist(playerPoint));
          var dir = PVector.sub(this.hook, playerPoint);
          dir.normalize();
          dir.mult(dist - this.ropeLength);
          this.v = dir;
        } else if (this.grapplingTarget.dist(this.hook) < GRAPPLE_SPEED) {
          this.hook.set(this.grapplingTarget.x, this.grapplingTarget.y, 0);
          this.hooked = true;
          this.ropeLength = round(this.hook.dist(this.centerPoint()));
        } else {
          var dir = PVector.sub(this.grapplingTarget, this.hook);
          dir.normalize();
          dir.mult(GRAPPLE_SPEED);
          this.hook.add(dir);
        }
        enemies.forEach(function(enemy) {
          if (enemy.containsPoint(this.hook)) {
            enemy.hit();
            noah.score += 500;
          }
        }, this);
        if (this.p.dist(this.hook) > MAX_GRAPPLE_DIST) {
          this.grappling = false;
          this.hooked = false;
        }
      }

      handleInput(grapplePoints) {
        var up = this.upPressed(),
          down = this.downPressed(),
          left = this.leftPressed(),
          right = this.rightPressed(),
          grapple = this.grapplePressed();
        if (left) {
          this.moveLeft();
        } else if (right) {
          this.moveRight();
        }
        if (up && this.hooked) {
          this.ropeLength = max(0, this.ropeLength - 5);
          if (this.ropeLength === 0) {
            this.hooked = false;
            this.grappling = false;
          }
        } else if (up && (!this.falling || this.jumps > 0)) {
          this.jumps--;
          this.jump();
          this.resetUp();
        }
        if (grapple) {
          this.grapple(grapplePoints);
        }
      }

      handleCollision(tilemap, tiles) {
        if (super.handleCollision(tilemap, tiles)) {
          return true;
        }
        return false;
      }

      handleCollection(tile, layer, tx, ty) {
        super.handleCollection(tile, layer, tx, ty);
        var key = [tx, ty].toString();
        if (this.collectPoints.has(key)) return;
        this.collectPoints.add(key);

        if (tile.props.coins) {
          this.coins += tile.props.coins;
        }
        if (tile.props.score) {
          this.score += tile.props.score;
        }
        if (tile.props.gemID) {
          this.gems.push(tile.props.gemID);
        }
        console.log(this.coins, this.score, this.gems);
      }

      collideBottom() {
        super.collideBottom();
        this.resetJumps();
      }

      resetJumps() {
        this.jumps = PLAYER_JUMPS;
      }
    }

    class Dialog {
      constructor(text, name, id, bottom) {
        this.text = name + ": " + text;
        this.name = name;
        this.id = id;
        this.img = this.getImg();
        this.bottom = bottom || false;
        this.nChars = 1;
      }

      getImg() {
        switch (this.name) {
          default: {
            return NOAH_DIALOG_IMG;
          }
        }
      }

      finished() {
        return this.nChars >= this.text.length;
      }

      draw() {
        pushMatrix();
        var h = 160;
        if (this.bottom) {
          translate(0, height - h - 80);
        }
        noStroke();
        fill(0, 0, 0, 200);
        rect(20, 40, width - 40, h);
        rect(40, 20, width - 80, h + 40);
        translate(40, 40);
        fill(255, 255, 255, 100);
        rect(20, 40, 100, h - 80);
        rect(40, 20, 60, h - 40);
        image(this.img, 40, 40, 60, 80);
        translate(140, 20);
        fill(230, 230, 230);
        textFont(NGO_FONT, 32);
        text(this.text.slice(0, this.nChars), 0, 0, width - 240, h - 40);
        if (this.finished()) {
          if (!uc(this.t0)) {
            this.t0 = frameCount + 30;
          }
          fill(
            255,
            255,
            255,
            map(sin((frameCount - this.t0) / 30), -1, 1, 0, 255)
          );
          var t = "PRESS SPACE";
          var tw = textWidth(t);
          text(t, width - 240 - tw, h - 40);
        }
        popMatrix();
        this.nChars++;
      }
    }

    var outlineText = function(
      text_,
      x,
      y,
      textColor,
      outlineColor,
      outlineWidth
    ) {
      fill(outlineColor);
      for (var dx = -outlineWidth; dx <= outlineWidth; dx++) {
        for (var dy = -outlineWidth; dy <= outlineWidth; dy++) {
          text(text_, x + dx, y + dy);
        }
      }
      fill(textColor);
      text(text_, x, y);
    };

    class HUD {
      constructor() {}
      drawLives() {
        image(HUD_LIVES_IMG, 5, 5);
        textFont(NGO_FONT, 32);
        outlineText(
          "x " + lives,
          15 + HUD_LIVES_IMG.width,
          5 + HUD_LIVES_IMG.height,
          color(255, 255, 255),
          color(100, 100, 100),
          2
        );
      }
      drawCoins() {
        image(
          HUD_COIN_IMG,
          5,
          7 + (HUD_LIVES_IMG.height - HUD_COIN_IMG.height)
        );
        textFont(NGO_FONT, 32);
        outlineText(
          "x " + noah.coins,
          15 + HUD_COIN_IMG.width,
          5 + HUD_LIVES_IMG.height,
          color(255, 255, 255),
          color(100, 100, 100),
          2
        );
      }
      drawScore() {
        textFont(NGO_FONT, 32);
        var t = "Score: " + noah.score.pad(8);
        var tw = textWidth(t);
        outlineText(
          t,
          width - tw - 5,
          5 + HUD_LIVES_IMG.height,
          color(255, 255, 255),
          color(100, 100, 100),
          2
        );
      }
      draw() {
        pushMatrix();
        this.drawLives();
        translate(80, 0);
        this.drawCoins();
        popMatrix();
        this.drawScore();
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

    var drawLayer = function(camera, layer, tilemap, tiles, collectPoints) {
      var r = min(camera.y + camera.ry, layer.height - 1);
      var rf = max(camera.y - camera.ry, 0);
      for (; r >= rf; r--) {
        var c = max(camera.x - camera.rx, 0);
        var cf = min(camera.x + camera.rx, layer.width);
        for (; c < cf; c++) {
          var dx = (frameCount / 4) % (tilemap.tilewidth * tilemap.width);
          var col = c;
          if (layer.props.scroll) {
            var sd = layer.props.scrollDir;
            col = mod(c - sd * floor(dx / tilemap.tilewidth), tilemap.width);
          }
          var id = layer.data[r * layer.width + col];
          if (id !== 0) {
            if (
              layer.props.collectibles &&
              collectPoints.has([c, r].toString())
            ) {
              continue;
            }
            var tile = tiles[id];
            var x = col * tilemap.tilewidth;
            if (layer.props.scroll) {
              x = mod(x + sd * dx, tilemap.width * tilemap.tilewidth);
            }
            var y = (r + 1) * tilemap.tileheight - tile.height;
            pushMatrix();
            translate(x + tile.width / 2, y);
            if (layer.props.flip && floor(frameCount / 20) % 2 === 0) {
              scale(-1, 1);
            }
            image(tile.image, -tile.width / 2, 0);
            popMatrix();
          }
        }
      }
    };

    loadLevel(level);

    var keyPressed = function() {
      keys[keyCode] = true;
      keys[key] = true;
      if (keys["?"]) {
        showInstructions = !showInstructions;
      }
      if (keys[" "]) {
        if (dialogs.length > 0 && dialogs[0].finished()) {
          dialogs.shift();
        }
      }
      if (keys[DOWN] || keys["s"]) {
        var door = atDoor(noah.p, doors);
        if (door && door.props.nextLevel) {
          loadLevel(door.props.nextLevel);
        }
      }
    };

    var keyReleased = function() {
      keys[keyCode] = false;
      keys[key] = false;
    };

    var draw = function() {
      if (!gameInit) return;
      camera.update(noah, tilemap);
      if (dialogs.length === 0) {
        noah.update(tilemap, tiles, enemies, grapplePoints);
        if (noah.p.y > tilemap.tileheight * tilemap.height + 100) {
          return restartLevel();
        }
        for (var i = 0; i < enemies.length; i++) {
          var enemy = enemies[i];
          if (enemy.dead) {
            enemies.splice(i, 1);
            i--;
            continue;
          }
          enemy.update(tilemap, tiles);
          if (enemy.intersects(noah)) {
            return restartLevel();
          }
        }
      }

      pushMatrix();
      background(20, 20, 20);
      switch (level) {
        case "gameover": {
          textFont(NGO_FONT, 128);
          var t = "GAME OVER";
          var tw = textWidth(t);
          outlineText(
            t,
            width / 2 - tw / 2,
            height / 2,
            color(255, 255, 255),
            color(150, 150, 150),
            8
          );
          break;
        }
        case "coming_soon": {
          image(
            NGO_COMING_SOON,
            width / 2 - NGO_COMING_SOON.width / 2,
            height / 2 - NGO_COMING_SOON.height / 2
          );
          break;
        }
        default: {
          camera.show();
          tilemap.layers.forEach(function(layer) {
            drawLayer(camera, layer, tilemap, tiles, noah.collectPoints);
          });
          noah.draw();
          enemies.forEach(function(enemy) {
            enemy.draw();
          });
          var activeGP = getActiveGP(
            grapplePoints,
            noah.centerPoint(),
            noah.dir
          );
          if (activeGP !== undefined) {
            var d = map(sin(frameCount / 15), -1, 1, 0, 10);
            stroke(255, 0, 0);
            strokeWeight(0);
            noFill();
            ellipse(activeGP.x, activeGP.y, d, d);
          }
          break;
        }
      }
      popMatrix();
      if (level === "HomeScreenMap") {
        image(NGO_TITLE, width / 2 - NGO_TITLE.width / 2, 10);
        image(NGO_INSTRUCTIONS, width / 2 - NGO_INSTRUCTIONS.width / 2, 280);
        image(NGO_CREATOR, width / 2 - NGO_CREATOR.width / 2, 330);
      }
      if (!["HomeScreenMap", "gameover", "coming_soon"].includes(level)) {
        hud.draw();
      }
      if (dialogs.length > 0) {
        dialogs[0].draw();
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
