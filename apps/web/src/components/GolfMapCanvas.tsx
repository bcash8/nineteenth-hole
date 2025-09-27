import type { GolfMap } from "@repo/shared/features/types";
import { useEffect, useRef, useState } from "react";
import { drawShape } from "../logic/rendering";

import {
  ballSize,
  boundaryColor,
  objectColors,
  obstacleColors,
  pixelsPerMeter,
  surfaceColors,
  ballPixelPerMeter,
} from "@repo/shared/features/configs";

type Props = {
  map: GolfMap;
  width?: number;
  height?: number;
};

export function GolfMapCanvas({ map, width = 600, height = 850 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [viewport, setViewport] = useState({
    scale: 1,
    pan: { x: 0, y: 0 },
  });

  const isDragging = useRef(false);
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const didFirstFit = useRef(false);

  // set inital viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    if (didFirstFit.current) return;
    didFirstFit.current = true;

    const dpr = window.devicePixelRatio || 1;

    const xs = map.boundaries.points.map((pt) => pt.x);
    const ys = map.boundaries.points.map((pt) => pt.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const boundaryWidth = maxX - minX + 10;
    const boundaryHeight = maxY - minY + 10;

    const scaleX = canvas.width / (boundaryWidth * pixelsPerMeter);
    const scaleY = canvas.height / (boundaryHeight * pixelsPerMeter);
    const fitScale = Math.min(scaleX, scaleY);

    const clampedScale = Math.max(0.2, Math.min(fitScale, 10));

    const boundaryCP = {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
    };
    const canvasCP = { x: canvas.width / 2, y: canvas.height / 2 };

    const newPan = {
      x: canvasCP.x - boundaryCP.x * (clampedScale * pixelsPerMeter),
      y: canvasCP.y - boundaryCP.y * (clampedScale * pixelsPerMeter),
    };

    console.log({
      cw: canvas.width,
      ch: canvas.height,
      dpr,
      boundaryWidth,
      boundaryHeight,
      scaleX,
      scaleY,
      fitScale,
      clampedScale,
      boundaryCP,
      canvasCP,
      newPan,
    });

    setViewport({ scale: clampedScale, pan: newPan });
  }, [map, canvasRef]);

  // draw + DPR handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    // ensure canvas internal size matches CSS size * DPR
    const internalW = Math.max(1, Math.round(width * dpr));
    const internalH = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== internalW || canvas.height !== internalH) {
      canvas.width = internalW;
      canvas.height = internalH;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    // Clear in internal pixel space
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Compose world -> internal-pixel transform:
    // internal_px = meters * (scale * pixelsPerMeter * dpr) + pan_internal_px
    const a = viewport.scale * pixelsPerMeter * dpr;
    ctx.save();
    ctx.setTransform(a, 0, 0, a, viewport.pan.x, viewport.pan.y);

    // Now draw using world units (meters). Transform handles scaling.
    // Boundaries
    ctx.fillStyle = boundaryColor;
    drawShape(ctx, map.boundaries);
    ctx.fill();

    // Surfaces
    for (const s of map.surfaces) {
      ctx.fillStyle = surfaceColors[s.surfaceType];
      drawShape(ctx, s.shape);
      ctx.fill();
    }

    // Obstacles
    for (const o of map.obstacles) {
      ctx.fillStyle = obstacleColors[o.obstacleType];
      drawShape(ctx, o.shape);
      ctx.fill();
    }

    // Objects: draw using world units: positions and radii are meters
    for (const obj of map.objects) {
      ctx.fillStyle = objectColors[obj.type];
      if (obj.type === "hole") {
        // obj.radius in meters -> transform scales it
        ctx.beginPath();
        ctx.arc(obj.position.x, obj.position.y, obj.radius, 0, Math.PI * 2);
        ctx.fill();
      } else if (obj.type === "ball") {
        // draw ball using real meter radius; transform will scale to pixels
        const radiusMeters = ballSize * ballPixelPerMeter; // ballSize in meters
        ctx.beginPath();
        ctx.arc(obj.position.x, obj.position.y, radiusMeters, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }, [map, viewport, width, height]);

  // events: drag + wheel (zoom centered on cursor)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // convert client (CSS) -> internal canvas pixel coords
    const clientToCanvas = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      // internal canvas pixels = (client - rect.left) * (canvas.width / rect.width)
      const x = (clientX - rect.left) * (canvas.width / rect.width);
      const y = (clientY - rect.top) * (canvas.height / rect.height);
      return { x, y }; // internal pixels
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastPos.current = clientToCanvas(e.clientX, e.clientY);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const pos = clientToCanvas(e.clientX, e.clientY);
      const dx = pos.x - lastPos.current.x;
      const dy = pos.y - lastPos.current.y;
      lastPos.current = pos;
      // pan is in internal pixels; dx/dy already internal pixels
      setViewport((vp) => {
        const newPan = { x: vp.pan.x + dx, y: vp.pan.y + dy };
        return { ...vp, pan: newPan };
      });
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // mouse position in *canvas internal pixels*
      const { x: mouseX, y: mouseY } = clientToCanvas(e.clientX, e.clientY);

      setViewport(({ scale, pan }) => {
        const zoomFactor = 1.1;
        const requested =
          e.deltaY < 0 ? scale * zoomFactor : scale / zoomFactor;
        const clamped = Math.max(0.2, Math.min(requested, 10));

        const worldX = (mouseX - pan.x) / (scale * pixelsPerMeter);
        const worldY = (mouseY - pan.y) / (scale * pixelsPerMeter);

        const newPanX = mouseX - worldX * (clamped * pixelsPerMeter);
        const newPanY = mouseY - worldY * (clamped * pixelsPerMeter);

        return {
          scale: clamped,
          pan: { x: newPanX, y: newPanY },
        };
      });
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        border: "1px solid #333",
        backgroundColor: "#000",
        borderRadius: "0.5rem",
        display: "block",
      }}
    />
  );
}
