<template>
  <div class="Background" />
  <div class="Modal">
    <div class="ModalHeader">
      <h3>Suas cartas</h3>
      <p class="Close" v-on:click="closeModal">X</p>
    </div>
    <p v-if="cards.length === 0">Nenhuma carta</p>
    <CardList :cards="cards" />
  </div>
</template>

<script lang="ts">
import CardList from './CardList.vue'
export default {
  components: {
    CardList
  },

  props: {
    cards: { type: [Object], required: true }
  },

  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped>
.Modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  background-color: white;

  max-width: 40rem;
  height: fit-content;

  padding: 0.25rem 1rem;
  border-radius: 1rem;
}

.ModalHeader {
  display: flex;
  justify-content: space-between;
}

.Close {
  cursor: pointer;
}

.Close:hover {
  font-weight: bold;
}

.Background {
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--gray-background-color);
  width: 100vw;
  height: 100vh;
}
</style>
