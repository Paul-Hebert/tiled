import { generateTile } from "../../helpers/generate-tile";
import { Level } from "../../types/level";
import { shapesByName } from "../shapes";

export const level1: Level = {
  title: "Fertile Ground",
  percentRequiredComplete: 0.8,
  grid: [
    [null, 0, null, 0, 0, null],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, null],
    [null, 0, 0, 0, 0, null],
    [0, 0, 0, 0, 0, 0],
    [null, 0, 0, 0, null, null],
  ],
  tiles: [
    [
      generateTile({ shape: shapesByName["2-Square"] }),
      generateTile({ shape: shapesByName["Little L"] }),
      generateTile({ shape: shapesByName["Mid Bar"] }),
    ],
    [generateTile({ shape: shapesByName["Little L"] })],
    [generateTile({ shape: shapesByName["Little L"] })],
  ],
};
