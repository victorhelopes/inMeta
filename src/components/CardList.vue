<template>
  <div class="ImgList">
    <div v-for="cardInfo in cards" :key="cardInfo">
      <img
        v-if="FilterCard(cardInfo)"
        :src="cardInfo.card?.imageUrl ? cardInfo.card.imageUrl : cardInfo.imageUrl"
        alt="card photo not informed"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    cards: [Object],
    onlyOffers: Boolean,
    onlyMyCards: { type: Boolean, required: false },
    userId: { type: String, required: false }
  },

  methods: {
    FilterCard(card: ITradeBodyCard) {
      let show = true
      if (this.onlyOffers) show = card.type === 'OFFERING'
      return show
    }
  }
}
</script>

<style>
.ImgList {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  overflow: auto;
  max-height: 40rem;
}
</style>
