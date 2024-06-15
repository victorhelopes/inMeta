<template>
  <div class="CardSelect">
    <div v-for="cardInfo in cards" :key="cardInfo">
      <img
        v-on:click="
          isCardSelected(cardInfo) === 'Selected' ? removeCard(cardInfo) : addCard(cardInfo)
        "
        :class="isCardSelected(cardInfo)"
        :src="cardInfo.imageUrl"
        :alt="cardInfo.name || 'Carta não possui imagem ou nome'"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    cards: Object
  },

  data: () => ({
    cardsSelecteds: []
  }),

  methods: {
    addCard(cardSelected) {
      this.cardsSelecteds.push(cardSelected.id)
      this.$emit('updateData', this.cardsSelecteds)
    },

    removeCard(cardSelected) {
      const newCardList = this.cardsSelecteds.filter((card) => {
        return card !== cardSelected.id
      })
      this.cardsSelecteds = newCardList
      this.$emit('updateData', this.cardsSelecteds)
    },

    isCardSelected(cardSelected) {
      const cardOnList = this.cardsSelecteds.find((card) => {
        if (cardSelected.id === card) return 1
      })
      if (cardOnList) return 'Selected'
    }
  }
}
</script>

<style>
.CardSelect {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;
  gap: 1.5rem;
}

.Selected {
  border-radius: 0.6rem;
  box-shadow: 0 0 0.5rem 0.25rem var(--orange-color);
}
</style>
