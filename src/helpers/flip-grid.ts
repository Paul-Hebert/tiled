import { Grid } from "../types/grid";

export function flipGrid(grid: Grid) {
  console.log(
    grid,
    grid.map((row) => [...row.reverse()])
  );
  return grid.map((row) => row.reverse());
}
