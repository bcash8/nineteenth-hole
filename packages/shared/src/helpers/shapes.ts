import { Point, Polygon, Shape } from "../features/types";

export function centerPoint(shape: Shape): Point {
  if (shape.type === "polygon") {
    let x = 0;
    let y = 0;
    for (const point of shape.points) {
      ((x += point.x), (y += point.y));
    }

    return { x: x / shape.points.length, y: y / shape.points.length };
  }

  return { x: shape.x, y: shape.y };
}
