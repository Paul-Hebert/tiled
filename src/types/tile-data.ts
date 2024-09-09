import { Point } from "./point";
import { Shape } from "./shape";

export interface TileData {
  shape: Shape;
  offset: Point;
  placed?: boolean;
  id: number | string;
  hue: number;
  rotation?: number;
  flipped?: boolean;
  price: number;
}
