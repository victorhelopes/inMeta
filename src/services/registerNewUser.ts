import { api } from '.'

interface INewUser {
  name: string
  email: string
  password: string
}

export async function registerNewUser(newUserData: INewUser) {
  try {
    const response = (await api.post('/register', newUserData)).data
    return response
  } catch (e: any) {
    return e.response.data.message
  }
}
