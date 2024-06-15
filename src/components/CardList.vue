<template>
  <div class="ImgList">
    <div v-for="cardInfo in cards" :key="cardInfo">
      <img
        v-if="onlyOffers ? onlyOffers && cardInfo.type === 'OFFERING' : true"
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
    onlyOffers: Boolean
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
