<template>
  <div class="Header">
    <HeaderComponent />
  </div>
  <div class="body">
    <h1>Cartas que estão sendo ofertadas</h1>
    <div class="CardList">
      <div v-for="tradeInfos in list" :key="tradeInfos" class="Card">
        <b>Dono das cartas: </b>{{ tradeInfos.user.name }}
        <div class="CardList">
          <CardList :cards="tradeInfos.tradeCards" :onlyOffers="true" />
        </div>
      </div>
    </div>
    <div v-if="more" class="ShowMore">
      <ButtonComponent @onButtonClick="getMoreTrades" label="Ver mais" />
    </div>
  </div>
</template>

<script lang="ts">
import { GetTrades } from '../services/api/cardService'

import ButtonComponent from '../components/ButtonComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import CardList from '../components/CardList.vue'

export default {
  components: {
    ButtonComponent,
    HeaderComponent,
    CardList
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
.Header {
  margin-bottom: 50px;
}

.body {
  height: auto;
  padding-bottom: 1rem;
}

.Card {
  width: fit-content;
  margin-left: 0.3rem;
}

.CardList {
  display: flex;
  flex-wrap: wrap;
  height: auto;
  gap: 0.5rem;
}

.ShowMore {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
</style>
