<template>
  <div class="Card">
    <h1>Cadastrar novo usuário</h1>
    <TextField
      label="Nome*"
      placeholder="Nome"
      :errorMessage="requiredFieldMessage"
      :showError="triedCreateUser && userInfos.name === ''"
      :value="userInfos.name"
      :onChange="
        (value) => {
          userInfos.name = value.target.value
        }
      "
    />
    <TextField
      label="Email*"
      placeholder="Email"
      :value="userInfos.email"
      :errorMessage="'Email não é válido'"
      :showError="triedCreateUser && !emailIsValid"
      inputType="email"
      :onChange="
        (value) => {
          userInfos.email = value.target.value
        }
      "
    />
    <TextField
      label="Senha*"
      placeholder="Senha"
      inputType="password"
      :errorMessage="requiredFieldMessage"
      :showError="triedCreateUser && userInfos.password === ''"
      :value="userInfos.password"
      :onChange="
        (value) => {
          userInfos.password = value.target.value
        }
      "
    />
    <div class="CardFooter">
      <ErrorMessage v-if="emailAlreadyExists" errorMessage="Email já cadastrado" />
      <ButtonComponent @on-button-click="handleRegister" label="Cadastrar" />
    </div>
  </div>
</template>

<script lang="ts">
import ButtonComponent from '../components/ButtonComponent.vue'
import TextField from '../components/TextField.vue'
import ErrorMessage from '../components/ErrorMessageComponent.vue'

import { registerNewUser } from '../services/api/userService'

import ValidateEmail from '../utils/ValidateEmail'

export default {
  components: {
    ButtonComponent,
    TextField,
    ErrorMessage
  },

  data: () => ({
    userInfos: { email: '', password: '', name: '' },

    triedCreateUser: false,
    emailIsValid: false,
    emailAlreadyExists: false,

    requiredFieldMessage: 'Campo obrigatório'
  }),

  methods: {
    async handleRegister() {
      this.emailIsValid = ValidateEmail(this.userInfos.email)
      this.triedCreateUser = true

      if (
        this.emailIsValid &&
        this.userInfos.name.length > 0 &&
        this.userInfos.password.length > 0
      ) {
        const response = await registerNewUser(this.userInfos)
        if (response === 'User already exists') this.emailAlreadyExists = true
        return response
      }
    }
  }
}
</script>

<style scoped>
.Card {
  margin: auto;
}
</style>
