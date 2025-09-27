import { GolfMap } from "../features/types";

export const EagleMountain: GolfMap = {
  courseName: "Eagle Mountain",
  par: 3,
  boundaries: {
    type: "polygon",
    points: [
      { x: 0, y: 117 },
      { x: 38, y: 117 },
      { x: 38, y: 0 },
      { x: 0, y: 0 },
    ],
  },
  surfaces: [
    {
      id: "rough1",
      surfaceType: "rough",
      shape: {
        type: "polygon",
        points: [
          { x: 3, y: 114 },
          { x: 35, y: 114 },
          { x: 35, y: 3 },
          { x: 3, y: 3 },
        ],
      },
    },
    {
      id: "fairway1",
      surfaceType: "fairway",
      shape: {
        type: "polygon",
        points: [
          { x: 7, y: 104 },
          { x: 27, y: 104 },
          { x: 30, y: 60 },
          { x: 30, y: 10 },
          { x: 7, y: 10 },
        ],
      },
    },
    {
      id: "green1",
      surfaceType: "green",
      shape: {
        type: "polygon",
        points: [
          { x: 13, y: 17 },
          { x: 22, y: 17 },
          { x: 24, y: 27 },
          { x: 22, y: 47 },
          { x: 15, y: 46 },
          { x: 12, y: 27 },
        ],
      },
    },
  ],
  objects: [
    { type: "ball", position: { x: 15, y: 104 } },
    { type: "hole", position: { x: 17, y: 30 }, radius: 0.4 },
  ],
  obstacles: [
    {
      id: "tree1",
      obstacleType: "tree",
      shape: { type: "circle", x: 30, y: 100, r: 1 },
    },
  ],
};
