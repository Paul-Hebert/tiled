import { hues } from "../data/hues";
import { patch } from "../data/shapes";
import { TileData } from "../types/tile-data";
import { getIncrementedId } from "./get-incremented-id";
import { randomTile } from "./random-tile";
/* @ts-expect-error */
import { randomItemInArray, randomInt } from "randomness-helpers";

export function generateTileOptions() {
  const newOptions: TileData[] = [];

  while (newOptions.length < 3) {
    const newTile = randomTile();

    if (!newOptions.some((tile) => tile.shape.name === newTile.shape.name)) {
      newOptions.push(newTile);
    }
  }

  newOptions.push({
    shape: patch,
    id: getIncrementedId(),
    hue: randomItemInArray(hues),
    price: 3,
    income: 0,
    offset: { x: 0, y: 0 },
  });

  return newOptions;
}
