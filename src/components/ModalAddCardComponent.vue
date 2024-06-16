<template>
  <div class="Background" />
  <div class="Modal">
    <div class="ModalHeader">
      <h3>Adcione cartas ao seu baralho</h3>
      <p class="Close" v-on:click="closeModal">X</p>
    </div>
    <div class="ModalBody">
      <CardSelect
        :cards="list"
        @updateData="
          (value) => {
            cardsSelecteds = value
          }
        "
      />
      <div v-if="more" class="ShowMore">
        <ButtonComponent :on-button-click="getMoreCards" label="Ver mais" />
      </div>
    </div>
    <div class="ModalFooter">
      <ButtonComponent :on-button-click="addCards" label="Confirmar" />
    </div>
  </div>
</template>

<script lang="ts">
import { getAllCards } from '../services/api/cardService'
import { addCard } from '../services/api/userService'

import CardSelect from './CardSelect.vue'
import ButtonComponent from './ButtonComponent.vue'

export default {
  components: {
    CardSelect,
    ButtonComponent
  },

  props: {
    cards: { type: [Object], required: true }
  },

  data: () => ({
    list: [],
    cardsSelecteds: [],
    rpp: 10,
    page: 1,
    more: false
  }),

  async mounted() {
    const response = await getAllCards({
      rpp: 10,
      page: 1
    })
    this.more = response.more
    this.list = response.list
  },

  methods: {
    closeModal() {
      this.$emit('closeModal')
    },

    async getMoreCards() {
      const response = await getAllCards({
        rpp: 10,
        page: this.page + 1
      })
      this.page = response.page
      this.more = response.more
      this.list = this.list.concat(response.list)
    },

    async addCards() {
      await addCard(this.cardsSelecteds)
      this.closeModal()
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

  max-width: 80rem;
  height: fit-content;
  max-height: 50rem;

  padding: 0.5rem 1rem;
  border-radius: 1rem;
}

.ModalHeader {
  display: flex;
  justify-content: space-between;
}

.ModalBody {
  max-height: 30rem;
  overflow: auto;
}

.ModalFooter {
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
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

.ShowMore {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
</style>
