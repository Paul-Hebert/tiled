import { Shape } from "./shape";

export interface TileData {
  shape: Shape;
  x: number;
  y: number;
  placed?: boolean;
  id: number | string;
  hue: number;
  rotation?: number;
  flipped?: boolean;
}
