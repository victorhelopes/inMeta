<template>
  <div class="Header">
    <HeaderComponent />
  </div>
  <div class="body">
    <h1>Cartas que estão sendo ofertadas</h1>
    <ButtonComponent
      @on-button-click="
        () => {
          showMyOnly = !showMyOnly
        }
      "
      label="Mostrar apenas minhas trocas"
    />
    <div class="CardList">
      <div v-for="tradeInfos in list" :key="tradeInfos.id">
        <div v-if="showMyOnly ? filterOnlyMyTrade(tradeInfos) : true" class="Card">
          <div>
            <b>Dono das cartas: </b>{{ tradeInfos.user.name }}
            <ButtonComponent
              v-if="showMyOnly ? filterOnlyMyTrade(tradeInfos) : false"
              @on-button-click="
                () => {
                  deleteTrade(tradeInfos.id)
                }
              "
              label="Excluir troca"
            />
          </div>
          <div class="CardList">
            <CardList
              :cards="tradeInfos.tradeCards"
              :onlyOffers="true"
              :only-my-cards="showMyOnly"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="more" class="ShowMore">
      <ButtonComponent @on-button-click="getMoreTrades" label="Ver mais" />
    </div>
  </div>
</template>

<script lang="ts">
import { GetTrades } from '../services/api/cardService'
import { deleteTrade } from '../services/api/userService'

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
    list: [] as ITradeList[],
    rpp: 10,
    page: 1,
    more: false,
    showMyOnly: false
  }),

  async created() {
    this.getFirstPageOfTrade()
  },

  methods: {
    async getFirstPageOfTrade() {
      const response = await GetTrades({
        rpp: 10,
        page: 1
      })
      this.more = response.more
      this.list = response.list
    },
    async getMoreTrades() {
      const response = await GetTrades({
        rpp: 10,
        page: this.page + 1
      })
      this.page = response.page
      this.more = response.more
      this.list = this.list.concat(response.list)
    },

    filterOnlyMyTrade(trade: ITradeList) {
      const userId = localStorage.getItem('userId')
      if (this.showMyOnly) return trade.userId === userId
      return true
    },

    async deleteTrade(id: string) {
      const response = await deleteTrade(id)
      if (response.statusCode === 500) return false
      this.getFirstPageOfTrade()
    }
  }
}
</script>

<style scoped>
.Header {
  margin-bottom: 50px;
}

@media screen and (max-width: 780px) {
  .Header {
    margin-bottom: 100px;
  }
}

.body {
  height: auto;
  padding-bottom: 1rem;

  button {
    margin: 1rem 0;
  }
}

.Card {
  width: fit-content;
  margin-left: 0.3rem;

  button {
    display: none;
  }
}

.Card:hover {
  button {
    display: block;
  }
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
