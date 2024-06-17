<template>
  <button @click="$emit('onButtonClick')">{{ label }}</button>
</template>

<script lang="ts">
export default {
  props: {
    label: String
  }
}
</script>

<style scoped>
button {
  background-color: var(--green-color);
  color: white;

  padding: 0.5rem 3rem;

  border: none;
  border-radius: 0.5rem;

  cursor: pointer;

  font-size: 1rem;
  font-weight: bold;
}

button:hover {
  background-color: var(--green-darker-color);
}
</style>
