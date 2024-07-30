import { Shape } from "../types/shape";

export const shapes: Record<string, Shape> = {
  T: {
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
};
