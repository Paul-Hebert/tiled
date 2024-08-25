import { Shape } from "../types/shape";

export const shapesByName = {
  Patch: {
    name: "Patch",
    grid: [[1]],
    outlinePoints: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ],
  },
  "2-Square": {
    name: "2-Square",
    grid: [
      [1, 1],
      [1, 1],
    ],
    outlinePoints: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
      {
        x: 2,
        y: 2,
      },
      {
        x: 0,
        y: 2,
      },
    ],
  },
  "Little L": {
    name: "Little L",
    grid: [
      [1, 0],
      [1, 1],
    ],
    outlinePoints: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
      {
        x: 2,
        y: 2,
      },
      {
        x: 0,
        y: 2,
      },
    ],
  },
  Squiggle: {
    name: "Squiggle",
    grid: [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    outlinePoints: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
      {
        x: 2,
        y: 2,
      },
      {
        x: 1,
        y: 2,
      },
      {
        x: 1,
        y: 3,
      },
      {
        x: 0,
        y: 3,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
    ],
  },
  "Long Squiggle": {
    name: "Long Squiggle",
    grid: [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    outlinePoints: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 3,
        y: 0,
      },
      {
        x: 3,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
      {
        x: 2,
        y: 4,
      },
      {
        x: 0,
        y: 4,
      },
      {
        x: 0,
        y: 3,
      },
      {
        x: 1,
        y: 3,
      },
    ],
  },
  T: {
    name: "T",
    grid: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
    ],
    outlinePoints: [
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
      {
        x: 2,
        y: 0,
      },
      {
        x: 3,
        y: 0,
      },
      {
        x: 3,
        y: 1,
      },
      {
        x: 3,
        y: 2,
      },
      {
        x: 3,
        y: 3,
      },
      {
        x: 2,
        y: 3,
      },
      {
        x: 2,
        y: 2,
      },
      {
        x: 1,
        y: 2,
      },
      {
        x: 0,
        y: 2,
      },
    ],
  },
  Plus: {
    name: "Plus",
    grid: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    outlinePoints: [
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
      {
        x: 2,
        y: 1,
      },
      {
        x: 3,
        y: 1,
      },
      {
        x: 3,
        y: 2,
      },
      {
        x: 2,
        y: 2,
      },
      {
        x: 2,
        y: 3,
      },
      {
        x: 1,
        y: 3,
      },
      {
        x: 1,
        y: 2,
      },
      {
        x: 0,
        y: 2,
      },
    ],
  },
  Cross: {
    name: "Cross",
    grid: [
      [0, 1, 0, 0],
      [1, 1, 1, 1],
      [0, 1, 0, 0],
    ],
    outlinePoints: [
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
      {
        x: 2,
        y: 1,
      },
      {
        x: 4,
        y: 1,
      },
      {
        x: 4,
        y: 2,
      },
      {
        x: 2,
        y: 2,
      },
      {
        x: 2,
        y: 3,
      },
      {
        x: 1,
        y: 3,
      },
      {
        x: 1,
        y: 2,
      },
      {
        x: 0,
        y: 2,
      },
    ],
  },
  U: {
    name: "U",
    grid: [
      [1, 1],
      [1, 0],
      [1, 1],
    ],
    outlinePoints: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
      {
        x: 2,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 2,
      },
      {
        x: 2,
        y: 2,
      },
      {
        x: 2,
        y: 3,
      },
      {
        x: 0,
        y: 3,
      },
    ],
  },
  Belly: {
    name: "Belly",
    grid: [
      [1, 0],
      [1, 1],
      [1, 1],
    ],
    outlinePoints: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
      {
        x: 2,
        y: 3,
      },
      {
        x: 0,
        y: 3,
      },
    ],
  },
  "Stubby T": {
    name: "Stubby T",
    grid: [
      [0, 1],
      [1, 1],
      [0, 1],
    ],
    outlinePoints: [
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
      {
        x: 2,
        y: 3,
      },
      {
        x: 1,
        y: 3,
      },
      {
        x: 1,
        y: 2,
      },
      {
        x: 0,
        y: 2,
      },
    ],
  },
  "Long Bar": {
    name: "Long Bar",
    grid: [[1], [1], [1], [1]],
    outlinePoints: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 4,
      },
      {
        x: 0,
        y: 4,
      },
    ],
  },
  "Mid Bar": {
    name: "Mid Bar",
    grid: [[1], [1], [1]],
    outlinePoints: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 3,
      },
      {
        x: 0,
        y: 3,
      },
    ],
  },
  "Short Bar": {
    name: "Short Bar",
    grid: [[1], [1]],
    outlinePoints: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 2,
      },
      {
        x: 0,
        y: 2,
      },
    ],
  },
};
