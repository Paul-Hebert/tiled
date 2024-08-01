import { Grid } from "./grid";
import { Point } from "./point";

export interface Shape {
  name: string;
  grid: Grid;
  outlinePoints: Point[];
  rotationPoint?: Point;
}
