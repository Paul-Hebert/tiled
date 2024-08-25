import { hues } from "../data/hues";
import { Shape } from "../types/shape";
import { getIncrementedId } from "./get-incremented-id";
import { padShapeToSquare } from "./pad-shape-to-square";
/* @ts-expect-error */
import { randomItemInArray, randomInt } from "randomness-helpers";

export function generateTile({
  shape,
  price,
  income,
}: {
  shape: Shape;
  price?: number;
  income?: number;
}) {
  return {
    shape: padShapeToSquare(shape),
    id: getIncrementedId(),
    hue: randomItemInArray(hues),
    price: price || 0,
    income: income || 0,
    offset: { x: 0, y: 0 },
  };
}
