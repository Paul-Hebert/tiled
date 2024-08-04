import { Grid } from "../types/grid";
import { rotateGrid } from "./rotate-grid";
import { expect, test } from "vitest";

const smallL: Grid = [
  [1, 0],
  [1, 1],
];

test("rotate small l", () => {
  expect(rotateGrid({ grid: smallL, rotation: 90 })).toStrictEqual([
    [1, 1],
    [1, 0],
  ]);

  // The original grid should be unchanged
  expect(smallL).toStrictEqual([
    [1, 0],
    [1, 1],
  ]);

  expect(rotateGrid({ grid: smallL, rotation: 180 })).toStrictEqual([
    [1, 1],
    [0, 1],
  ]);

  expect(rotateGrid({ grid: smallL, rotation: 270 })).toStrictEqual([
    [0, 1],
    [1, 1],
  ]);
});

test("rotate with negative values", () => {
  expect(rotateGrid({ grid: smallL, rotation: -90 })).toStrictEqual([
    [0, 1],
    [1, 1],
  ]);

  expect(rotateGrid({ grid: smallL, rotation: -180 })).toStrictEqual([
    [1, 1],
    [0, 1],
  ]);

  expect(rotateGrid({ grid: smallL, rotation: -270 })).toStrictEqual([
    [1, 1],
    [1, 0],
  ]);
});

test("rotate with values of 360 or more", () => {
  expect(rotateGrid({ grid: smallL, rotation: 360 })).toStrictEqual(smallL);

  expect(rotateGrid({ grid: smallL, rotation: 360 + 90 })).toStrictEqual([
    [1, 1],
    [1, 0],
  ]);

  expect(rotateGrid({ grid: smallL, rotation: 360 + 180 })).toStrictEqual([
    [1, 1],
    [0, 1],
  ]);

  expect(rotateGrid({ grid: smallL, rotation: 360 + 270 })).toStrictEqual([
    [0, 1],
    [1, 1],
  ]);
});

test("rotate with negative less than -360", () => {
  expect(rotateGrid({ grid: smallL, rotation: -90 - 360 })).toStrictEqual([
    [0, 1],
    [1, 1],
  ]);

  expect(rotateGrid({ grid: smallL, rotation: -180 - 360 })).toStrictEqual([
    [1, 1],
    [0, 1],
  ]);

  expect(rotateGrid({ grid: smallL, rotation: -270 - 360 })).toStrictEqual([
    [1, 1],
    [1, 0],
  ]);
});

test("rotate squiggle", () => {
  const squiggle: Grid = [
    [0, 1],
    [1, 1],
    [1, 0],
  ];

  expect(rotateGrid({ grid: squiggle, rotation: 90 })).toStrictEqual([
    [1, 1, 0],
    [0, 1, 1],
  ]);

  // The original grid should be unchanged
  expect(squiggle).toStrictEqual([
    [0, 1],
    [1, 1],
    [1, 0],
  ]);

  expect(rotateGrid({ grid: squiggle, rotation: 180 })).toStrictEqual([
    [0, 1],
    [1, 1],
    [1, 0],
  ]);

  expect(rotateGrid({ grid: squiggle, rotation: 270 })).toStrictEqual([
    [1, 1, 0],
    [0, 1, 1],
  ]);
});
