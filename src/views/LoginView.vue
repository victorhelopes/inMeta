<template>
  <div class="Card">
    <h1>Login</h1>
    <TextField
      label="Email"
      placeholder="Email"
      :value="this.loginInfos.email"
      inputType="email"
      :onChange="
        (value) => {
          this.loginInfos.email = value.target.value
        }
      "
    />
    <TextField
      label="Senha"
      placeholder="Senha"
      inputType="password"
      :value="this.loginInfos.password"
      :onChange="
        (value) => {
          this.loginInfos.password = value.target.value
        }
      "
    />
    <div class="CardFooter">
      <ErrorMessage v-if="loginError" errorMessage="Email ou senha estão incorretos" />
      <ButtonComponent @onButtonClick="this.handleLogin" label="Login" />
      <router-link to="/Register">Cadastrar novo usuario</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import ButtonComponent from '../components/ButtonComponent.vue'
import ErrorMessage from '../components/ErrorMessageComponent.vue'
import TextField from '../components/TextField.vue'

import { Login } from '../services/login.ts'

export default {
  components: {
    TextField,
    ButtonComponent,
    ErrorMessage
  },

  data: () => ({
    loginInfos: { email: '', password: '' },
    loginError: false
  }),

  methods: {
    async handleLogin() {
      if (this.loginInfos.email.length > 0) {
        const response = await Login(this.loginInfos)

        if (!response.token) {
          this.loginError = true
          return
        }
        localStorage.setItem('token', response.token)
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.Card {
  width: 100%;
  box-sizing: border-box;
  max-width: 20rem;
}
h1 {
  margin-top: 0;
  width: 100%;
  text-align: center;
}

a {
  margin: auto;
  margin-top: 1rem;
  width: fit-content;
  text-align: center;
  font-size: small;
}
</style>
