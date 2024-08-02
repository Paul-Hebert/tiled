import { Grid } from "../types/grid";
import { Point } from "../types/point";

export function getActivePointsFromGrid({
  grid,
  offset,
}: {
  grid: Grid;
  offset: Point;
}): Point[] {
  const activePoints: Point[] = [];

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        activePoints.push({ x: x + offset.x, y: y + offset.y });
      }
    });
  });

  return activePoints;
}
