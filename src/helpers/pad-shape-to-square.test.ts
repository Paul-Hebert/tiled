import { expect, test } from "vitest";
import { padShapeToSquare } from "./pad-shape-to-square";
import { Shape } from "../types/shape";

test("it should add columns on the right without adjusting the outline", () => {
  const squiggle: Shape = {
    name: "Squiggle",
    grid: [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    outlinePoints: [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 0, y: 3 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
  };

  const duplicateSquiggle = {
    name: "Squiggle",
    grid: [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    outlinePoints: [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 0, y: 3 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
  };

  const paddedSquiggle = padShapeToSquare(squiggle);

  // The original shape should be unchanged.
  expect(squiggle).toStrictEqual(duplicateSquiggle);

  expect(paddedSquiggle.grid).toStrictEqual([
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ]);

  expect(paddedSquiggle.outlinePoints).toStrictEqual(
    duplicateSquiggle.outlinePoints
  );
});

test("it should add columns on both sides and adjust the outline", () => {
  const longBar: Shape = {
    name: "Long Bar",
    grid: [[1], [1], [1], [1]],
    outlinePoints: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 4 },
      { x: 0, y: 4 },
    ],
  };

  const paddedLongBar = padShapeToSquare(longBar);

  expect(paddedLongBar.grid).toStrictEqual([
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ]);

  expect(paddedLongBar.outlinePoints).toStrictEqual([
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 4 },
    { x: 1, y: 4 },
  ]);
});

test("it should add rows on both sides and adjust the outline", () => {
  const longBar: Shape = {
    name: "Long Bar",
    grid: [[1, 1, 1, 1]],
    outlinePoints: [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 0, y: 1 },
    ],
  };

  const paddedLongBar = padShapeToSquare(longBar);

  expect(paddedLongBar.grid).toStrictEqual([
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  expect(paddedLongBar.outlinePoints).toStrictEqual([
    { x: 0, y: 1 },
    { x: 4, y: 1 },
    { x: 4, y: 2 },
    { x: 0, y: 2 },
  ]);
});
