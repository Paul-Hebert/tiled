import { Grid } from "./grid";
import { TileData } from "./tile-data";

export interface Level {
  grid: Grid;
  percentRequiredComplete: number;
  title: string;
  tiles: TileData[][];
}
