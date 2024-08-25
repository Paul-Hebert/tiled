import { Level } from "../../types/level";

export const level2: Level = {
  title: "Planting the Seed",
  grid: [
    [null, 0, null, 0, 0, null],
    [0, 0, 0, null, 0, 0],
    [null, 0, 0, 0, 0, null],
    [null, 0, 0, 0, null, null],
    [0, 0, 0, null, null, null],
    [null, 0, 0, null, null, null],
  ],

  tiles: [
    [{ shape: "2-Square" }, { shape: "Little L" }, { shape: "Mid Bar" }],
    [{ shape: "2-Square" }, { shape: "Little L" }, { shape: "Mid Bar" }],
  ],
};
