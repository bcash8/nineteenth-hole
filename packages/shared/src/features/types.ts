export type Point = { x: number; y: number };
export type Polygon = { type: "polygon"; points: Point[] };
export type Circle = { type: "circle"; x: number; y: number; r: number };
export type Shape = Polygon | Circle;

export type SurfaceType =
  | "fairway"
  | "teebox"
  | "green"
  | "rough"
  | "sand"
  | "water"
  | "oob";

export type Surface = { id: string; shape: Shape; surfaceType: SurfaceType };

export type Obstacle = {
  id: string;
  shape: Shape;
  obstacleType: "tree" | "rock" | "wall";
};

export type GameplayObject =
  | { type: "ball"; position: Point }
  | { type: "hole"; position: Point; radius: number };

export type GolfMap = {
  courseName: string;
  par: number;
  boundaries: Polygon;
  surfaces: Surface[];
  obstacles: Obstacle[];
  objects: GameplayObject[];
};
