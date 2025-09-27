import { GolfMap } from "../features/types";

export const testMap: GolfMap = {
  courseName: "Vector Valley",
  par: 4,
  boundaries: {
    type: "polygon",
    points: [
      { x: 0, y: 0 },
      { x: 300, y: 0 },
      { x: 300, y: 200 },
      { x: 0, y: 200 },
    ],
  },
  surfaces: [
    {
      id: "fairway1",
      shape: {
        type: "polygon",
        points: [
          { x: 15, y: 25 },
          { x: 275, y: 25 },
          { x: 275, y: 175 },
          { x: 15, y: 175 },
        ],
      },
      surfaceType: "fairway",
    },
    {
      id: "rough1",
      shape: {
        type: "polygon",
        points: [
          { x: 10, y: 10 },
          { x: 280, y: 10 },
          { x: 280, y: 30 },
          { x: 10, y: 30 },
        ],
      },
      surfaceType: "rough",
    },
    {
      id: "teebox1",
      shape: {
        type: "polygon",
        points: [
          { x: 20, y: 30 },
          { x: 40, y: 30 },
          { x: 40, y: 40 },
          { x: 20, y: 40 },
        ],
      },
      surfaceType: "teebox",
    },
    {
      id: "water1",
      shape: {
        type: "circle",
        x: 100,
        y: 100,
        r: 40,
      },
      surfaceType: "water",
    },
    {
      id: "green",
      shape: {
        type: "circle",
        x: 250,
        y: 130,
        r: 20,
      },
      surfaceType: "green",
    },
    {
      id: "sand1",
      shape: {
        type: "circle",
        x: 250,
        y: 30,
        r: 20,
      },
      surfaceType: "sand",
    },
  ],
  obstacles: [],
  objects: [
    { type: "ball", position: { x: 100, y: 150 } },
    { type: "hole", position: { x: 250, y: 130 }, radius: 1 },
  ],
};
