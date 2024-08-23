<script setup lang="ts">
import { XIcon } from "lucide-vue-next";

withDefaults(
  defineProps<{
    size?: "large" | "medium";
    pulse?: boolean;
  }>(),
  { size: "medium" }
);
</script>

<template>
  <button :class="`size-${size} ${pulse ? 'pulse' : ''}`">
    <span class="button-inner">
      <slot />

      <span class="disabled-message" v-if="$attrs.disabled">
        <XIcon />
      </span>
    </span>
  </button>
</template>

<style scoped>
button {
  --translation: 0.25em;

  color: hsl(210, 100%, 40%);
  background: none;
  border: none;
  appearance: none;
  border-radius: 0.5em;
  height: 3em;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  position: relative;
  font-size: 1.25em;
  padding: 0 1px;
}

button:not([disabled]):hover {
  --translation: 0.5em;
}

button:not([disabled]):active {
  --translation: 0;
}

button:focus {
  outline: none;
}

.button-inner,
button::before {
  border-radius: inherit;
}

.button-inner {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: inherit;
  translate: 0 calc(var(--translation) * -1);
  transition: translate 0.1s ease-out;
  display: grid;
  place-content: center;
  user-select: none;
  padding: 0.5em;
  will-change: transform;
  width: 100%;
  height: 100%;
}

button::before {
  content: "";
  background: #ddd;
  position: absolute;
  inset: 0;
}

button:focus-visible .button-inner {
  outline: 3px solid hsl(210, 100%, 40%);
}

.size-large {
  font-size: 2em;
}

.size-large .button-inner {
  padding: 0.5em 1em;
}

.pulse .button-inner {
  --shake: 2deg;
  animation: pulse 1s var(--ease-out-back), shake-z 0.6s ease-out;
}

button[disabled] {
  --translation: 0;
}

.disabled-message {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  color: #fff;
  background: hsla(0, 100%, 81%, 0.7);
  border-radius: inherit;
  font-size: 3em;
  color: red;
  border-radius: inherit;
}

@keyframes pulse {
  0% {
    translate: 0;
  }
  50% {
    translate: 0 -1em;
    scale: 1.02;
  }
}
</style>
