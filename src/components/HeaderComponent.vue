<template>
  <div class="Header Container">
    <div v-if="userLogged" class="MenuOptions">
      <p v-on:click="openModal">Minhas Cartas</p>
      <hr />
      <p v-on:click="openModalAddCard">Adicionar Cartas</p>
      <hr />
      <p v-on:click="openModalAddTradeCard">Adicionar Troca</p>
      <hr />
      <p v-on:click="logout">Logout</p>
    </div>
    <div v-else>
      <p v-on:click="goToLoginPage">Login</p>
    </div>
  </div>
  <ModalAddCard
    v-if="modaAddCardIsOpen"
    @closeModal="
      () => {
        closeModal()
        getUserInfos()
      }
    "
    :cards="cards"
  />
  <ModalAddTradeCard
    v-if="modaAddTradeCardIsOpen"
    @closeModal="
      () => {
        closeModal()
        getUserInfos()
      }
    "
    :myCards="cards"
  />
  <ModalComponent v-if="modalIsOpen" @closeModal="closeModal" :cards="cards" />
</template>

<script lang="ts">
import { auth } from '../services/api/userService'
import { logout } from '../services/api/userService'

import ModalComponent from './ModalComponent.vue'
import ModalAddCard from './ModalAddCardComponent.vue'
import ModalAddTradeCard from './ModalAddTradeCard.vue'

export default {
  components: {
    ModalComponent,
    ModalAddCard,
    ModalAddTradeCard
  },

  data: () => ({
    cards: [],
    userLogged: true,
    modalIsOpen: false,
    modaAddCardIsOpen: false,
    modaAddTradeCardIsOpen: false
  }),

  methods: {
    logout() {
      logout()
      this.goToLoginPage()
    },

    goToLoginPage() {
      this.$router.push('/Login')
    },

    closeModal() {
      this.modalIsOpen = false
      this.modaAddCardIsOpen = false
      this.modaAddTradeCardIsOpen = false
    },

    openModalAddCard() {
      this.modaAddCardIsOpen = true
    },

    openModalAddTradeCard() {
      this.modaAddTradeCardIsOpen = true
    },

    openModal() {
      this.modalIsOpen = true
    },

    async getUserInfos() {
      const response = await auth()
      if (response.cards) {
        localStorage.setItem('userId', response.id)
        this.cards = response.cards
      } else {
        this.userLogged = false
      }
    }
  },

  async created() {
    this.getUserInfos()
  }
}
</script>

<style scoped>
.Header {
  position: absolute;
  top: 0;
  left: 0;
  height: fit-content;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--orange-color);
}

.MenuOptions {
  display: flex;
  width: fit-content;

  hr {
    margin: 1rem 1rem;
  }
}

p {
  cursor: pointer;
}
</style>
