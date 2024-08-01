import { onMounted } from "vue";
import { Commands } from "../types/commands";

export function useKeyboardCommands({
  moveBlockUp,
  moveBlockDown,
  moveBlockLeft,
  moveBlockRight,
  rotateBlockLeft,
  rotateBlockRight,
  placeBlock,
}: Commands) {
  onMounted(() => {
    document.addEventListener("keydown", (e) => {
      console.log(e);
      switch (e.key) {
        case "ArrowUp":
        case "w":
          moveBlockUp();
          break;
        case "ArrowDown":
        case "s":
          moveBlockDown();
          break;
        case "ArrowLeft":
        case "a":
          moveBlockLeft();
          break;
        case "ArrowRight":
        case "d":
          moveBlockRight();
          break;
        case "q":
          rotateBlockLeft();
          break;
        case "e":
          rotateBlockRight();
          break;
        case "Enter":
        case " ":
          placeBlock();
          break;
      }
    });
  });
}
