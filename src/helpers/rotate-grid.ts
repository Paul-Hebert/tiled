import { Grid } from "../types/grid";
import { logGrid } from "./log-grid";
import { rotate } from "2d-array-rotation";

export function rotateGrid({
  grid,
  rotation,
}: {
  grid: Grid;
  rotation?: number;
}) {
  if (!rotation) return grid;

  const gridCopy = [...grid.map((row) => [...row])];

  const rotatedGrid = rotate(gridCopy, rotation);

  return rotatedGrid;
}
