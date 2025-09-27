import type { Shape } from "@repo/shared/features/types";

export function drawShape(ctx: CanvasRenderingContext2D, shape: Shape) {
  if (shape.type === "polygon") {
    const pts = shape.points;
    if (pts.length === 0) return;
    ctx.beginPath();
    ctx.moveTo(pts[0]!.x, pts[0]!.y);
    pts.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.closePath();
  } else if (shape.type === "circle") {
    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.r, 0, Math.PI * 2);
    ctx.closePath();
  }
}
