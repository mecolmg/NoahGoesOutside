(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("TileMap1",
{ "height":20,
 "infinite":false,
 "layers":[
        {
         "data":[0, 129, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 74, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 129, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0, 83, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":20,
         "id":3,
         "name":"tile_layer_z0",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 74, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 74, 74, 74, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 62, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 61, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 83, 0, 0, 0, 0, 0, 0, 0, 83, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 67, 0, 0, 0, 0, 0, 0, 83, 67, 67, 83, 83, 83, 83, 83, 83, 83, 83, 83, 67, 67, 83, 83, 83, 83, 83, 83, 67, 67, 67],
         "height":20,
         "id":1,
         "name":"tile_layer_z1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":4,
         "name":"point_markers",
         "objects":[
                {
                 "height":0,
                 "id":32,
                 "name":"start",
                 "point":true,
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":105,
                 "y":35
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":5,
 "nextobjectid":33,
 "orientation":"orthogonal",
 "renderorder":"left-up",
 "tiledversion":"1.2.0",
 "tileheight":70,
 "tilesets":[
        {
         "columns":0,
         "firstgid":1,
         "grid":
            {
             "height":1,
             "orientation":"orthogonal",
             "width":1
            },
         "margin":0,
         "name":"Platformer Base",
         "spacing":0,
         "tilecount":172,
         "tileheight":146,
         "tiles":[
                {
                 "id":0,
                 "image":"Base pack\/Tiles\/box.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":1,
                 "image":"Base pack\/Tiles\/boxAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":2,
                 "image":"Base pack\/Tiles\/boxCoin_disabled.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":3,
                 "image":"Base pack\/Tiles\/boxCoin.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":4,
                 "image":"Base pack\/Tiles\/boxCoinAlt_disabled.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":5,
                 "image":"Base pack\/Tiles\/boxCoinAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":6,
                 "image":"Base pack\/Tiles\/boxEmpty.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":7,
                 "image":"Base pack\/Tiles\/boxExplosive_disabled.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":8,
                 "image":"Base pack\/Tiles\/boxExplosive.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":9,
                 "image":"Base pack\/Tiles\/boxExplosiveAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":10,
                 "image":"Base pack\/Tiles\/boxItem_disabled.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":11,
                 "image":"Base pack\/Tiles\/boxItem.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":12,
                 "image":"Base pack\/Tiles\/boxItemAlt_disabled.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":13,
                 "image":"Base pack\/Tiles\/boxItemAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":14,
                 "image":"Base pack\/Tiles\/boxWarning.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":15,
                 "image":"Base pack\/Tiles\/brickWall.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":16,
                 "image":"Base pack\/Tiles\/bridge.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":17,
                 "image":"Base pack\/Tiles\/bridgeLogs.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":18,
                 "image":"Base pack\/Tiles\/castle.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":19,
                 "image":"Base pack\/Tiles\/castleCenter_rounded.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":20,
                 "image":"Base pack\/Tiles\/castleCenter.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":21,
                 "image":"Base pack\/Tiles\/castleCliffLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":22,
                 "image":"Base pack\/Tiles\/castleCliffLeftAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":23,
                 "image":"Base pack\/Tiles\/castleCliffRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":24,
                 "image":"Base pack\/Tiles\/castleCliffRightAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":25,
                 "image":"Base pack\/Tiles\/castleHalf.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":26,
                 "image":"Base pack\/Tiles\/castleHalfLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":27,
                 "image":"Base pack\/Tiles\/castleHalfMid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":28,
                 "image":"Base pack\/Tiles\/castleHalfRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":29,
                 "image":"Base pack\/Tiles\/castleHillLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":30,
                 "image":"Base pack\/Tiles\/castleHillLeft2.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":31,
                 "image":"Base pack\/Tiles\/castleHillRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":32,
                 "image":"Base pack\/Tiles\/castleHillRight2.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":33,
                 "image":"Base pack\/Tiles\/castleLedgeLeft.png",
                 "imageheight":22,
                 "imagewidth":5
                }, 
                {
                 "id":34,
                 "image":"Base pack\/Tiles\/castleLedgeRight.png",
                 "imageheight":22,
                 "imagewidth":5
                }, 
                {
                 "id":35,
                 "image":"Base pack\/Tiles\/castleLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":36,
                 "image":"Base pack\/Tiles\/castleMid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":37,
                 "image":"Base pack\/Tiles\/castleRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":38,
                 "image":"Base pack\/Tiles\/dirt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":39,
                 "image":"Base pack\/Tiles\/dirtCenter_rounded.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":40,
                 "image":"Base pack\/Tiles\/dirtCenter.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":41,
                 "image":"Base pack\/Tiles\/dirtCliffLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":42,
                 "image":"Base pack\/Tiles\/dirtCliffLeftAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":43,
                 "image":"Base pack\/Tiles\/dirtCliffRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":44,
                 "image":"Base pack\/Tiles\/dirtCliffRightAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":45,
                 "image":"Base pack\/Tiles\/dirtHalf.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":46,
                 "image":"Base pack\/Tiles\/dirtHalfLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":47,
                 "image":"Base pack\/Tiles\/dirtHalfMid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":48,
                 "image":"Base pack\/Tiles\/dirtHalfRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":49,
                 "image":"Base pack\/Tiles\/dirtHillLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":50,
                 "image":"Base pack\/Tiles\/dirtHillLeft2.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":51,
                 "image":"Base pack\/Tiles\/dirtHillRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":52,
                 "image":"Base pack\/Tiles\/dirtHillRight2.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":53,
                 "image":"Base pack\/Tiles\/dirtLedgeLeft.png",
                 "imageheight":18,
                 "imagewidth":5
                }, 
                {
                 "id":54,
                 "image":"Base pack\/Tiles\/dirtLedgeRight.png",
                 "imageheight":18,
                 "imagewidth":5
                }, 
                {
                 "id":55,
                 "image":"Base pack\/Tiles\/dirtLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":56,
                 "image":"Base pack\/Tiles\/dirtMid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":57,
                 "image":"Base pack\/Tiles\/dirtRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":58,
                 "image":"Base pack\/Tiles\/door_closedMid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":59,
                 "image":"Base pack\/Tiles\/door_closedTop.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":60,
                 "image":"Base pack\/Tiles\/door_openMid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":61,
                 "image":"Base pack\/Tiles\/door_openTop.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":62,
                 "image":"Base pack\/Tiles\/fence.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":63,
                 "image":"Base pack\/Tiles\/fenceBroken.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":64,
                 "image":"Base pack\/Tiles\/grass.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collideTop",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":65,
                 "image":"Base pack\/Tiles\/grassCenter_rounded.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collide",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":66,
                 "image":"Base pack\/Tiles\/grassCenter.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collide",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":67,
                 "image":"Base pack\/Tiles\/grassCliffLeft.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collideTop",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":68,
                 "image":"Base pack\/Tiles\/grassCliffLeftAlt.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collideTop",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":69,
                 "image":"Base pack\/Tiles\/grassCliffRight.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collideTop",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":70,
                 "image":"Base pack\/Tiles\/grassCliffRightAlt.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collideTop",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":71,
                 "image":"Base pack\/Tiles\/grassHalf.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collideTop",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":72,
                 "image":"Base pack\/Tiles\/grassHalfLeft.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collideTop",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":73,
                 "image":"Base pack\/Tiles\/grassHalfMid.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collideTop",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":74,
                 "image":"Base pack\/Tiles\/grassHalfRight.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collideTop",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":75,
                 "image":"Base pack\/Tiles\/grassHillLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":76,
                 "image":"Base pack\/Tiles\/grassHillLeft2.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":77,
                 "image":"Base pack\/Tiles\/grassHillRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":78,
                 "image":"Base pack\/Tiles\/grassHillRight2.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":79,
                 "image":"Base pack\/Tiles\/grassLedgeLeft.png",
                 "imageheight":24,
                 "imagewidth":5
                }, 
                {
                 "id":80,
                 "image":"Base pack\/Tiles\/grassLedgeRight.png",
                 "imageheight":24,
                 "imagewidth":5
                }, 
                {
                 "id":81,
                 "image":"Base pack\/Tiles\/grassLeft.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collide",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":82,
                 "image":"Base pack\/Tiles\/grassMid.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collide",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":83,
                 "image":"Base pack\/Tiles\/grassRight.png",
                 "imageheight":70,
                 "imagewidth":70,
                 "properties":[
                        {
                         "name":"collide",
                         "type":"bool",
                         "value":true
                        }]
                }, 
                {
                 "id":84,
                 "image":"Base pack\/Tiles\/hill_large.png",
                 "imageheight":146,
                 "imagewidth":48
                }, 
                {
                 "id":85,
                 "image":"Base pack\/Tiles\/hill_largeAlt.png",
                 "imageheight":146,
                 "imagewidth":48
                }, 
                {
                 "id":86,
                 "image":"Base pack\/Tiles\/hill_small.png",
                 "imageheight":106,
                 "imagewidth":48
                }, 
                {
                 "id":87,
                 "image":"Base pack\/Tiles\/hill_smallAlt.png",
                 "imageheight":106,
                 "imagewidth":48
                }, 
                {
                 "id":88,
                 "image":"Base pack\/Tiles\/ladder_mid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":89,
                 "image":"Base pack\/Tiles\/ladder_top.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":90,
                 "image":"Base pack\/Tiles\/liquidLava.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":91,
                 "image":"Base pack\/Tiles\/liquidLavaTop_mid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":92,
                 "image":"Base pack\/Tiles\/liquidLavaTop.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":93,
                 "image":"Base pack\/Tiles\/liquidWater.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":94,
                 "image":"Base pack\/Tiles\/liquidWaterTop_mid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":95,
                 "image":"Base pack\/Tiles\/liquidWaterTop.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":96,
                 "image":"Base pack\/Tiles\/lock_blue.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":97,
                 "image":"Base pack\/Tiles\/lock_green.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":98,
                 "image":"Base pack\/Tiles\/lock_red.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":99,
                 "image":"Base pack\/Tiles\/lock_yellow.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":100,
                 "image":"Base pack\/Tiles\/rockHillLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":101,
                 "image":"Base pack\/Tiles\/rockHillRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":102,
                 "image":"Base pack\/Tiles\/ropeAttached.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":103,
                 "image":"Base pack\/Tiles\/ropeHorizontal.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":104,
                 "image":"Base pack\/Tiles\/ropeVertical.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":105,
                 "image":"Base pack\/Tiles\/sand.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":106,
                 "image":"Base pack\/Tiles\/sandCenter_rounded.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":107,
                 "image":"Base pack\/Tiles\/sandCenter.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":108,
                 "image":"Base pack\/Tiles\/sandCliffLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":109,
                 "image":"Base pack\/Tiles\/sandCliffLeftAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":110,
                 "image":"Base pack\/Tiles\/sandCliffRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":111,
                 "image":"Base pack\/Tiles\/sandCliffRightAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":112,
                 "image":"Base pack\/Tiles\/sandHalf.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":113,
                 "image":"Base pack\/Tiles\/sandHalfLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":114,
                 "image":"Base pack\/Tiles\/sandHalfMid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":115,
                 "image":"Base pack\/Tiles\/sandHalfRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":116,
                 "image":"Base pack\/Tiles\/sandHillLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":117,
                 "image":"Base pack\/Tiles\/sandHillLeft2.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":118,
                 "image":"Base pack\/Tiles\/sandHillRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":119,
                 "image":"Base pack\/Tiles\/sandHillRight2.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":120,
                 "image":"Base pack\/Tiles\/sandLedgeLeft.png",
                 "imageheight":18,
                 "imagewidth":5
                }, 
                {
                 "id":121,
                 "image":"Base pack\/Tiles\/sandLedgeRight.png",
                 "imageheight":18,
                 "imagewidth":5
                }, 
                {
                 "id":122,
                 "image":"Base pack\/Tiles\/sandLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":123,
                 "image":"Base pack\/Tiles\/sandMid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":124,
                 "image":"Base pack\/Tiles\/sandRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":125,
                 "image":"Base pack\/Tiles\/sign.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":126,
                 "image":"Base pack\/Tiles\/signExit.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":127,
                 "image":"Base pack\/Tiles\/signLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":128,
                 "image":"Base pack\/Tiles\/signRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":129,
                 "image":"Base pack\/Tiles\/snow.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":130,
                 "image":"Base pack\/Tiles\/snowCenter_rounded.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":131,
                 "image":"Base pack\/Tiles\/snowCenter.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":132,
                 "image":"Base pack\/Tiles\/snowCliffLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":133,
                 "image":"Base pack\/Tiles\/snowCliffLeftAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":134,
                 "image":"Base pack\/Tiles\/snowCliffRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":135,
                 "image":"Base pack\/Tiles\/snowCliffRightAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":136,
                 "image":"Base pack\/Tiles\/snowHalf.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":137,
                 "image":"Base pack\/Tiles\/snowHalfLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":138,
                 "image":"Base pack\/Tiles\/snowHalfMid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":139,
                 "image":"Base pack\/Tiles\/snowHalfRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":140,
                 "image":"Base pack\/Tiles\/snowHillLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":141,
                 "image":"Base pack\/Tiles\/snowHillLeft2.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":142,
                 "image":"Base pack\/Tiles\/snowHillRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":143,
                 "image":"Base pack\/Tiles\/snowHillRight2.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":144,
                 "image":"Base pack\/Tiles\/snowLedgeLeft.png",
                 "imageheight":18,
                 "imagewidth":5
                }, 
                {
                 "id":145,
                 "image":"Base pack\/Tiles\/snowLedgeRight.png",
                 "imageheight":18,
                 "imagewidth":5
                }, 
                {
                 "id":146,
                 "image":"Base pack\/Tiles\/snowLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":147,
                 "image":"Base pack\/Tiles\/snowMid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":148,
                 "image":"Base pack\/Tiles\/snowRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":149,
                 "image":"Base pack\/Tiles\/stone.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":150,
                 "image":"Base pack\/Tiles\/stoneCenter_rounded.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":151,
                 "image":"Base pack\/Tiles\/stoneCenter.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":152,
                 "image":"Base pack\/Tiles\/stoneCliffLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":153,
                 "image":"Base pack\/Tiles\/stoneCliffLeftAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":154,
                 "image":"Base pack\/Tiles\/stoneCliffRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":155,
                 "image":"Base pack\/Tiles\/stoneCliffRightAlt.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":156,
                 "image":"Base pack\/Tiles\/stoneHalf.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":157,
                 "image":"Base pack\/Tiles\/stoneHalfLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":158,
                 "image":"Base pack\/Tiles\/stoneHalfMid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":159,
                 "image":"Base pack\/Tiles\/stoneHalfRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":160,
                 "image":"Base pack\/Tiles\/stoneHillLeft2.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":161,
                 "image":"Base pack\/Tiles\/stoneHillRight2.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":162,
                 "image":"Base pack\/Tiles\/stoneLedgeLeft.png",
                 "imageheight":24,
                 "imagewidth":5
                }, 
                {
                 "id":163,
                 "image":"Base pack\/Tiles\/stoneLedgeRight.png",
                 "imageheight":24,
                 "imagewidth":5
                }, 
                {
                 "id":164,
                 "image":"Base pack\/Tiles\/stoneLeft.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":165,
                 "image":"Base pack\/Tiles\/stoneMid.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":166,
                 "image":"Base pack\/Tiles\/stoneRight.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":167,
                 "image":"Base pack\/Tiles\/stoneWall.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":168,
                 "image":"Base pack\/Tiles\/tochLit.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":169,
                 "image":"Base pack\/Tiles\/tochLit2.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":170,
                 "image":"Base pack\/Tiles\/torch.png",
                 "imageheight":70,
                 "imagewidth":70
                }, 
                {
                 "id":171,
                 "image":"Base pack\/Tiles\/window.png",
                 "imageheight":70,
                 "imagewidth":70
                }],
         "tilewidth":70
        }],
 "tilewidth":70,
 "type":"map",
 "version":1.2,
 "width":20
});