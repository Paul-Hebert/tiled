import { Grid } from "./grid";

export interface Level {
  grid: Grid;
  percentRequiredComplete: number;
  title: string;
}
