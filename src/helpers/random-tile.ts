import { hues } from "../data/hues";
import { shapes } from "../data/shapes";
import { TileData } from "../types/tile-data";
import { getIncrementedId } from "./get-incremented-id";
import { padShapeToSquare } from "./pad-shape-to-square";
/* @ts-expect-error */
import { randomItemInArray, randomInt } from "randomness-helpers";

export function randomTile(): TileData {
  return {
    shape: padShapeToSquare(randomItemInArray(shapes)),
    id: getIncrementedId(),
    hue: randomItemInArray(hues),
    price: randomInt(1, 4),
    offset: { x: 0, y: 0 },
  };
}
