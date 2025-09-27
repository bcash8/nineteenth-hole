import { SurfaceType } from "./types";

export const boundaryColor = "#0b130fff";

export const surfaceColors: Record<SurfaceType, string> = {
  fairway: "#8FC74A",
  green: "#b6e883ff",
  teebox: "#b6e883ff",
  rough: "#659637ff",
  sand: "#fcd195ff",
  water: "#6ba9c8ff",
  oob: "#444444",
};

export const obstacleColors = {
  tree: "#2d5a27",
  rock: "#777777",
  wall: "#663300",
};

export const objectColors = {
  flag: "#ff0000",
  hole: "#000000",
  ball: "#fff",
};

export const ballSize = 0.0427;
export const ballPixelPerMeter = 5;

export const pixelsPerMeter = 2.5;
