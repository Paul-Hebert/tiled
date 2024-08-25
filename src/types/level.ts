import { GenerateTileArgs } from "../helpers/generate-tile";
import { Grid } from "./grid";

export interface Level {
  grid: Grid;
  title: string;
  tiles: GenerateTileArgs[][];
  events?: LevelEvent[];
}

interface LevelEvent {
  action: () => void;
}
