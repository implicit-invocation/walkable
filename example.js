var Walkable = require('./index');

var walkable = new Walkable(640, 480);

var rect = walkable.addRect(100, 100, 100, 100);
var path = walkable.findPath(2, 2, 300, 300, 1);
console.log(path);

walkable.deleteObstacle(rect);
path = walkable.findPath(2, 2, 300, 300, 1);
console.log(path);

var polyline = walkable.addPolyline([200, 10, 200, 400, 400, 400]);
path = walkable.findPath(2, 2, 300, 300, 1);
console.log(path);

walkable.deleteObstacle(polyline);
var polygon = walkable.addPolygon([200, 10, 200, 400, 400, 400]);
path = walkable.findPath(2, 2, 500, 300, 1);
console.log(path);
