import { Grid } from "../types/grid";
import rotateMatrix from "rotate-matrix";
import { logGrid } from "./log-grid";

export function rotateGrid({
  grid,
  rotation,
}: {
  grid: Grid;
  rotation?: number;
}) {
  if (!rotation) return grid;

  console.group("rotateGrid");
  console.log("original grid");
  logGrid(grid);

  const turns = (rotation / 90) % 4;

  console.log("turns", turns);

  const rotatedGrid = rotateMatrix([...grid.map((row) => [...row])], turns);
  console.log("rotated grid");
  logGrid(rotatedGrid);
  console.groupEnd();

  return rotatedGrid;
}
