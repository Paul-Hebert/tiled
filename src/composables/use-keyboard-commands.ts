import { onMounted } from "vue";

import { useCommands } from "./use-commands";

export function useKeyboardCommands() {
  const commands = useCommands();

  onMounted(() => {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          commands.moveTileUp();
          break;
        case "ArrowDown":
        case "s":
          commands.moveTileDown();
          break;
        case "ArrowLeft":
        case "a":
          commands.moveTileLeft();
          break;
        case "ArrowRight":
        case "d":
          commands.moveTileRight();
          break;
        case "q":
          commands.rotateTileLeft();
          break;
        case "e":
        case " ":
          commands.rotateTileRight();
          break;
        case "Enter":
          commands.placeTile();
          break;
      }
    });
  });
}
