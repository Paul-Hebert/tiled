<script setup lang="ts"></script>

<template>
  <button>
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
  height: 3rem;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  position: relative;
  font-size: 1.25rem;
}

button:active {
  --translation: 0;
}

.button-inner,
button::before {
  border-radius: inherit;
  position: absolute;
  inset: 0;
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
}

button::before {
  content: "";
  background: #ddd;
}
</style>
