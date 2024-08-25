import { hues } from "../data/hues";
import { shapesByName } from "../data/shapes";
import { getIncrementedId } from "./get-incremented-id";
import { padShapeToSquare } from "./pad-shape-to-square";
/* @ts-expect-error */
import { randomItemInArray, randomInt } from "randomness-helpers";

export interface GenerateTileArgs {
  shape: keyof typeof shapesByName;
  price?: number;
  income?: number;
}

export function generateTile({ shape, price, income }: GenerateTileArgs) {
  return {
    shape: padShapeToSquare(shapesByName[shape]),
    id: getIncrementedId(),
    hue: randomItemInArray(hues),
    price: price || 0,
    income: income || 0,
    offset: { x: 0, y: 0 },
  };
}
