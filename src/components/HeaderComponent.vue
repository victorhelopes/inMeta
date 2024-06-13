<template>
  <div class="Header Container">
    <div v-if="userLogged" class="MenuOptions">
      <p v-on:click="openModal">Minhas Cartas</p>
      <hr />
      <p v-on:click="logout">Logout</p>
    </div>
    <div v-else>
      <p v-on:click="goToLoginPage">Login</p>
    </div>
  </div>
  <ModalComponent v-if="modalIsOpen" @closeModal="closeModal" :cards="cards" />
</template>

<script lang="ts">
import { auth } from '../services/api/userService.ts'
import { logout } from '../services/api/userService.ts'

import ModalComponent from './ModalComponent.vue'

export default {
  components: {
    ModalComponent
  },
  data: () => ({
    cards: [],
    userLogged: true,
    modalIsOpen: false
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
    },

    openModal() {
      this.modalIsOpen = true
    }
  },

  async created() {
    const response = await auth()
    if (response.cards) this.cards = response.cards
    else {
      this.userLogged = false
    }
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
