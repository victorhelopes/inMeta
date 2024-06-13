import { api } from '../index.ts'

interface IUserData {
  email: string
  password: string
}

interface INewUser extends IUserData {
  name: string
}

export async function Login(loginData: IUserData) {
  try {
    const response = (await api.post('/login', loginData)).data
    return response
  } catch (e: any) {
    return e.response.data.message
  }
}

export async function registerNewUser(newUserData: INewUser) {
  try {
    const response = (await api.post('/register', newUserData)).data
    return response
  } catch (e: any) {
    return e.response.data.message
  }
}
