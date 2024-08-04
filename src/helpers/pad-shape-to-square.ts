import { Grid } from "../types/grid";
import { Shape } from "../types/shape";

/**
 * A lot of our code is made simpler by having all tiles live within a square
 * grid. However, we want to be able to define non-square shapes. This function
 * takes a rectangular shape and pads it into a square grid.
 */
export function padShapeToSquare(shape: Shape) {
  const shapeCopy = structuredClone(shape);
  let addToEnd = true;

  // Make the grid wider if necessary
  while (getWidth(shapeCopy.grid) < getHeight(shapeCopy.grid)) {
    if (addToEnd) {
      shapeCopy.grid = shapeCopy.grid.map((row) => [...row, 0]);
    } else {
      shapeCopy.grid = shapeCopy.grid.map((row) => [0, ...row]);

      shapeCopy.outlinePoints = shapeCopy.outlinePoints.map(({ x, y }) => ({
        x: x + 1,
        y,
      }));
    }

    addToEnd = !addToEnd;
  }

  // Make the grid taller if necessary
  while (getWidth(shapeCopy.grid) > getHeight(shapeCopy.grid)) {
    const newRow = Array(getWidth(shapeCopy.grid)).fill(0);
    if (addToEnd) {
      shapeCopy.grid.push([...newRow]);
    } else {
      shapeCopy.grid.unshift([...newRow]);

      shapeCopy.outlinePoints = shapeCopy.outlinePoints.map(({ x, y }) => ({
        x,
        y: y + 1,
      }));
    }

    addToEnd = !addToEnd;
  }

  return shapeCopy;
}

function getWidth(grid: Grid) {
  return grid[0].length;
}

function getHeight(grid: Grid) {
  return grid.length;
}
