import { Grid } from "./grid";
import { Point } from "./point";

export interface Shape {
  name: string;
  grid: Grid;
  // TODO: can we automate this?
  // @see https://chevyray.dev/blog/creating-175-fonts/
  outlinePoints: Point[];
  rotationPoint?: Point;
}
