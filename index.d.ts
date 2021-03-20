interface PathObject {}

export default class Walkable {
  constructor(width: number, height: number);
  addRect(w: number, h: number, x: number, y: number): PathObject;
  addPolygon(vertices: number[], x: number, y: number): PathObject;
  addPolyline(vertices: number[], x: number, y: number): PathObject;
  deleteObstacle(object: PathObject): void;
  findPath(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    radius: number,
    path?: number[]
  ): number[];
}
