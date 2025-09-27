import { GolfMap } from "../features/types";

export const squareMap: GolfMap = {
  courseName: "Square",
  par: 4,
  boundaries: {
    type: "polygon",
    points: [
      { x: 0, y: 0 },
      { x: 0, y: 440 },
      { x: 200, y: 440 },
      { x: 200, y: 0 },
    ],
  },
  surfaces: [
    {
      id: "rough1",
      surfaceType: "rough",
      shape: {
        type: "polygon",
        points: [
          { x: 10, y: 10 },
          { x: 10, y: 430 },
          { x: 190, y: 430 },
          { x: 190, y: 10 },
        ],
      },
    },
    {
      id: "fairway1",
      surfaceType: "fairway",
      shape: {
        type: "polygon",
        points: [
          { x: 40, y: 100 },
          { x: 40, y: 400 },
          { x: 160, y: 400 },
          { x: 160, y: 100 },
        ],
      },
    },
    {
      id: "green1",
      surfaceType: "green",
      shape: {
        type: "circle",
        x: 100,
        y: 50,
        r: 40,
      },
    },
    {
      id: "teebox1",
      surfaceType: "teebox",
      shape: {
        type: "polygon",
        points: [
          { x: 92, y: 390 },
          { x: 108, y: 390 },
          { x: 108, y: 410 },
          { x: 92, y: 410 },
        ],
      },
    },
  ],
  objects: [
    {
      type: "hole",
      position: {
        x: 100,
        y: 50,
      },
      radius: 2,
    },
    {
      type: "ball",
      position: {
        x: 100,
        y: 400,
      },
    },
  ],
  obstacles: [],
};
