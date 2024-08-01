import { onMounted } from "vue";
import { Commands } from "../types/commands";

export function useKeyboardCommands({
  moveTileUp,
  moveTileDown,
  moveTileLeft,
  moveTileRight,
  rotateTileLeft,
  rotateTileRight,
  placeTile,
}: Commands) {
  onMounted(() => {
    document.addEventListener("keydown", (e) => {
      console.log(e);
      switch (e.key) {
        case "ArrowUp":
        case "w":
          moveTileUp();
          break;
        case "ArrowDown":
        case "s":
          moveTileDown();
          break;
        case "ArrowLeft":
        case "a":
          moveTileLeft();
          break;
        case "ArrowRight":
        case "d":
          moveTileRight();
          break;
        case "q":
          rotateTileLeft();
          break;
        case "e":
          rotateTileRight();
          break;
        case "Enter":
        case " ":
          placeTile();
          break;
      }
    });
  });
}
