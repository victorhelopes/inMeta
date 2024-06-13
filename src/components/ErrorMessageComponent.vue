<template>
  <p class="error">{{ errorMessage }}</p>
</template>

<script>
export default {
  props: {
    errorMessage: String
  }
}
</script>
<style scoped>
.error {
  color: var(--cancel-color);
  margin-top: 0.5rem;
  font-size: small;
  font-weight: normal;
}
</style>
