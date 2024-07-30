import { Grid } from "./grid";
import { Point } from "./point";

export interface Shape {
  grid: Grid;
  outlinePoints: Point[];
}
