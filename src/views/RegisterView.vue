<template>
  <div class="Card">
    <h1>Cadastrar novo usuário</h1>
    <TextField
      label="Nome*"
      placeholder="Nome"
      :errorMessage="this.requiredFieldMessage"
      :showError="this.triedCreateUser && this.userInfos.name === ''"
      :value="this.userInfos.name"
      :onChange="
        (value) => {
          this.userInfos.name = value.target.value
        }
      "
    />
    <TextField
      label="Email*"
      placeholder="Email"
      :value="this.userInfos.email"
      :errorMessage="'Email não é válido'"
      :showError="this.triedCreateUser && !this.emailIsValid"
      inputType="email"
      :onChange="
        (value) => {
          this.userInfos.email = value.target.value
        }
      "
    />
    <TextField
      label="Senha*"
      placeholder="Senha"
      inputType="password"
      :errorMessage="this.requiredFieldMessage"
      :showError="this.triedCreateUser && this.userInfos.password === ''"
      :value="this.userInfos.password"
      :onChange="
        (value) => {
          this.userInfos.password = value.target.value
        }
      "
    />
    <div class="CardFooter">
      <ErrorMessage v-if="emailAlreadyExists" errorMessage="Email já cadastrado" />
      <ButtonComponent @onButtonClick="this.handleRegister" label="Cadastrar" />
    </div>
  </div>
</template>

<script lang="ts">
import ButtonComponent from '../components/ButtonComponent.vue'
import TextField from '../components/TextField.vue'
import ErrorMessage from '../components/ErrorMessageComponent.vue'

import { registerNewUser } from '../services/registerNewUser.ts'

import ValidateEmail from '../utils/ValidateEmail.ts'

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

      if (this.emailIsValid && this.userInfos.name.length > 0 && this.userInfos.password > 0) {
        const response = await registerNewUser(ValidateEmail)
        if (response === 'User already exists') this.emailAlreadyExists = true
        return response
      }
    }
  }
}
</script>
