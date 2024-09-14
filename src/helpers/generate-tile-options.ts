import { shapesByName } from "../data/shapes";
import { TileData } from "../types/tile-data";
// import { randomTile } from "./random-tile";
/* @ts-expect-error */
import { randomItemInArray, randomInt } from "randomness-helpers";
import { generateTile } from "./generate-tile";

export function generateTileOptions() {
  const newOptions: TileData[] = [];

  while (newOptions.length < 3) {
    const shape = randomItemInArray(Object.entries(shapesByName))[0];
    const price = randomInt(1, 5);

    newOptions.push(generateTile({shape, price}));
  }

  return newOptions;
}
