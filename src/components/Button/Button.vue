<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "large" | "medium";
  }>(),
  { size: "medium" }
);
</script>

<template>
  <button :class="`size-${size}`">
    <span class="button-inner">
      <slot />
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

button:hover {
  --translation: 0.5em;
}

button:active {
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
</style>
