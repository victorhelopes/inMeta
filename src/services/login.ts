import { api } from '.'

interface ILoginData {
  email: string
  password: string
}

export async function Login(loginData: ILoginData) {
  try {
    const response = (await api.post('/login', loginData)).data
    return response
  } catch (e: any) {
    return e.response.data.message
  }
}
