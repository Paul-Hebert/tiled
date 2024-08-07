import { useBoardState } from "../stores/board-state";
import { Commands } from "../types/commands";
import { Point } from "../types/point";
import { storeToRefs } from "pinia";

export function useCommands() {
  const boardStateStore = useBoardState();
  const { currentTile } = storeToRefs(boardStateStore);
  const { placeCurrentTile } = boardStateStore;

  function move(vector: Point) {
    if (!currentTile.value) return;

    // useSound("placed.mp3");

    currentTile.value.offset.x += vector.x;
    currentTile.value.offset.y += vector.y;
  }

  function rotate(angle: 90 | -90) {
    if (!currentTile.value) return;

    // useSound(angle === 90 ? "whoosh-2.mp3" : "whoosh-3.mp3");

    currentTile.value.rotation = (currentTile.value.rotation || 0) + angle;
  }

  const commands: Commands = {
    moveTileLeft: () => move({ x: -1, y: 0 }),
    moveTileRight: () => move({ x: 1, y: 0 }),
    moveTileUp: () => move({ x: 0, y: -1 }),
    moveTileDown: () => move({ x: 0, y: 1 }),
    rotateTileLeft: () => rotate(-90),
    rotateTileRight: () => rotate(90),
    placeTile: () => {
      // useSound("placed.mp3");
      placeCurrentTile();
    },
  };

  return commands;
}
