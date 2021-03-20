var hxDaedalus = require("hxdaedalus-js").hxDaedalus;

var RectMesh = hxDaedalus.factories.RectMesh;
var EntityAI = hxDaedalus.ai.EntityAI;
var PathFinder = hxDaedalus.ai.PathFinder;
var DaedalusObject = hxDaedalus.data.Object;

function Walkable(width, height) {
  var mesh = RectMesh.buildRectangle(width, height);
  var entity = new EntityAI();
  var pathFinder = new PathFinder();
  pathFinder.entity = entity;
  pathFinder.set_mesh(mesh);

  this.mesh = mesh;
  this.entity = entity;
  this.pathFinder = pathFinder;
  this.path = [];
}

Walkable.prototype.addRect = function (w, h, x, y) {
  var obj = new DaedalusObject();
  obj.set_coordinates([0, 0, 0, h, 0, h, w, h, w, h, w, 0, w, 0, 0, 0]);
  obj.set_x(x);
  obj.set_y(y);
  this.mesh.insertObject(obj);

  return obj;
};

Walkable.prototype.addPolygon = function (vertices, x, y) {
  if (vertices.length < 6) {
    console.log("Polygons must contain at least 3 points!");
    return;
  }
  var obj = new DaedalusObject();
  var coords = [];

  var prevX = vertices[vertices.length - 2],
    prevY = vertices[vertices.length - 1];

  for (var i = 0; i < vertices.length; i += 2) {
    var currX = vertices[i],
      currY = vertices[i + 1];
    coords.push(prevX, prevY, currX, currY);
    prevX = currX;
    prevY = currY;
  }

  obj.set_coordinates(coords);
  obj.set_x(x || 0);
  obj.set_y(y || 0);
  this.mesh.insertObject(obj);

  return obj;
};

Walkable.prototype.addPolyline = function (vertices, x, y) {
  if (vertices.length < 4) {
    console.log("Polylines must contain at least 2 points!");
    return;
  }
  var obj = new DaedalusObject();
  var coords = [];

  var prevX = 0,
    prevY = 0;

  for (var i = 0; i < vertices.length; i += 2) {
    var currX = vertices[i],
      currY = vertices[i + 1];
    if (i > 0) {
      coords.push(prevX, prevY, currX, currY);
    }
    prevX = currX;
    prevY = currY;
  }

  obj.set_coordinates(coords);
  obj.set_x(x || 0);
  obj.set_y(y || 0);
  this.mesh.insertObject(obj);

  return obj;
};

Walkable.prototype.deleteObstacle = function (obj) {
  this.mesh.deleteObject(obj);
};

Walkable.prototype.findPath = function (fromX, fromY, toX, toY, radius, path) {
  if (path === undefined) path = this.path;
  this.entity.set_radius(radius);
  this.entity.x = fromX;
  this.entity.y = fromY;

  this.pathFinder.findPath(toX, toY, path);

  return path;
};

module.exports = Walkable;
