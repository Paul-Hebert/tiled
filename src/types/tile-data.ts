import { Point } from "./point";
import { Shape } from "./shape";

export interface TileData {
  shape: Shape;
  offset: Point;
  placed?: boolean;
  id: number;
  hue: number;
  rotation?: number;
  flipped?: boolean;
}
