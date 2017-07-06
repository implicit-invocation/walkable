var Walkable = require('./index');

var walkable = new Walkable(640, 480);

walkable.addRect(100, 100, 100, 100);

var path = walkable.findPath(2, 2, 300, 300, 1);
console.log(path);
