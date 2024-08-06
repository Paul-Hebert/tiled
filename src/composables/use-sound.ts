export const audioContext = new AudioContext();

const sounds: Record<string, HTMLAudioElement> = {};

// TODO in the future check muted state, etc.
export function useSound(name: string) {
  if (!sounds[name]) {
    sounds[name] = new Audio(`/sounds/${name}`);
  }

  sounds[name].fastSeek(0);
  sounds[name].play();
}
