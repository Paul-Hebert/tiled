import { Shape } from "../types/shape";

export const shapes: Shape[] = [
  {
    name: "2-Square",
    grid: [
      [1, 1],
      [1, 1],
    ],
    outlinePoints: [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ],
  },
  {
    name: "Little L",
    grid: [
      [1, 0],
      [1, 1],
    ],
    outlinePoints: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ],
  },
  {
    name: "Squiggle",
    grid: [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    outlinePoints: [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 0, y: 3 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
  },
  {
    name: "Long Squiggle",
    grid: [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    outlinePoints: [
      { x: 1, y: 0 },
      { x: 3, y: 0 },
      { x: 3, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 4 },
      { x: 0, y: 4 },
      { x: 0, y: 3 },
      { x: 1, y: 3 },
    ],
  },
  {
    name: "T",
    grid: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
    ],
    outlinePoints: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ],
  },
  {
    name: "Plus",
    grid: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    outlinePoints: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ],
  },
  {
    name: "Cross",
    grid: [
      [0, 1, 0, 0],
      [1, 1, 1, 1],
      [0, 1, 0, 0],
    ],
    outlinePoints: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ],
  },
  {
    name: "U",
    grid: [
      [1, 1],
      [1, 0],
      [1, 1],
    ],
    outlinePoints: [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 0, y: 3 },
    ],
  },
  {
    name: "Belly",
    grid: [
      [1, 0],
      [1, 1],
      [1, 1],
    ],
    outlinePoints: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 3 },
      { x: 0, y: 3 },
    ],
  },
  {
    name: "Stubby T",
    grid: [
      [0, 1],
      [1, 1],
      [0, 1],
    ],
    outlinePoints: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ],
  },
  {
    name: "Long Bar",
    grid: [[1], [1], [1], [1]],
    outlinePoints: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 4 },
      { x: 0, y: 4 },
    ],
  },
  {
    name: "Mid Bar",
    grid: [[1], [1], [1]],
    outlinePoints: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 3 },
      { x: 0, y: 3 },
    ],
  },
  {
    name: "Short Bar",
    grid: [[1], [1]],
    outlinePoints: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ],
  },
];

export const patch: Shape = {
  name: "Patch",
  grid: [[1]],
  outlinePoints: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
  ],
};

export let shapesByName: Record<string, Shape> = {};

shapes.forEach((shape) => {
  shapesByName[shape.name] = shape;
});
