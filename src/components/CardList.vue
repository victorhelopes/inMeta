<template>
  <div v-for="cardInfo in cards" :key="cardInfo">
    <img
      v-if="onlyOffers && cardInfo.type === 'OFFERING'"
      :src="cardInfo.card.imageUrl"
      alt="card photo not informed"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    cards: [Object],
    onlyOffers: Boolean
  }
}
</script>
