<template>
  <div class="textField">
    <p>{{ label }}</p>
    <input
      :type="inputType"
      :placeholder="placeholder"
      :value="value"
      @input="(event) => onChange(event)"
    />
    <p v-if="!!showError" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    label: String,
    placeholder: String,
    value: String,
    onChange: {
      type: Function,
      required: true
    },
    inputType: {
      type: String
    },
    showError: {
      type: Boolean
    },
    errorMessage: {
      type: String
    }
  }
}
</script>

<style scoped>
.textField {
  margin-bottom: 1rem;
}

p {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}
input {
  width: 100%;
  box-sizing: border-box;

  font-size: 0.75rem;
  border: 0.0125rem solid var(--gray-color);
  padding: 0.75rem 0.25rem;
  border-radius: 0.25rem;
}

.error {
  color: var(--cancel-color);
  margin-top: 0.5rem;
  font-size: small;
  font-weight: normal;
}
</style>
