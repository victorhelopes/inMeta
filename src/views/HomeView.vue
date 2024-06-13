<template>
  <h1>Cartas que estão sendo ofertadas</h1>
  <div class="CardList">
    <div v-for="tradeInfos in list" :key="tradeInfos" class="Card">
      <b>Dono das cartas: </b>{{ tradeInfos.user.name }}
      <div class="CardList">
        <div v-for="cardInfo in tradeInfos.tradeCards" :key="cardInfo">
          <img
            v-if="cardInfo.type === 'OFFERING'"
            :src="cardInfo.card.imageUrl"
            alt="card photo not informed"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-if="more" class="ShowMore">
    <ButtonComponent @onButtonClick="getMoreTrades" label="Ver mais" />
  </div>
</template>

<script lang="ts">
import { GetTrades } from '../services/api/cardService.ts'
import ButtonComponent from '../components/ButtonComponent.vue'

export default {
  components: {
    ButtonComponent
  },

  data: () => ({
    list: [],
    rpp: 10,
    page: 1,
    more: false
  }),

  async created() {
    const response = await GetTrades({
      rpp: 10,
      page: 1
    })
    this.more = response.more
    this.list = response.list
  },

  methods: {
    async getMoreTrades() {
      const response = await GetTrades({
        rpp: 10,
        page: this.page + 1
      })
      this.page = response.page
      this.more = response.more
      this.list = this.list.concat(response.list)
    }
  }
}
</script>

<style scoped>
.Card {
  width: fit-content;
  margin-left: 0.3rem;
}

.CardList {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.ShowMore {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
</style>
