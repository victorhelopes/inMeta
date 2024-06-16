import api from '../index'
import { removeToken } from '../helpers/tokenHelper'

interface IUserData {
  email: string
  password: string
}

interface INewUser extends IUserData {
  name: string
}

interface ITrade {
  cardId: String
  type: 'OFFERING' | 'RECEIVING'
}

export async function Login(loginData: IUserData) {
  try {
    const response = (await api.post('/login', loginData)).data
    return response
  } catch (e: any) {
    return e.response
  }
}

export function logout() {
  removeToken()
}

export async function registerNewUser(newUserData: INewUser) {
  try {
    const response = (await api.post('/register', newUserData)).data
    return response
  } catch (e: any) {
    return e.response
  }
}

export async function addCard(cardIds: String[]) {
  try {
    const response = (await api.post('/me/cards', { cardIds: cardIds })).data
    return response
  } catch (e: any) {
    return e.response
  }
}

export async function auth() {
  try {
    const response = (await api.get('/me')).data
    return response
  } catch (e: any) {
    return e.response
  }
}

export async function addTrade({
  offering,
  receiving
}: {
  offering: String[]
  receiving: String[]
}) {
  const cards: ITrade[] = []
  offering.forEach((card) => {
    cards.push({
      cardId: card,
      type: 'OFFERING'
    })
  })
  receiving.forEach((card) => {
    cards.push({
      cardId: card,
      type: 'RECEIVING'
    })
  })

  try {
    const response = (await api.post('/trades', { cards: cards })).data
    return response
  } catch (e: any) {
    return e.response
  }
}

export async function deleteTrade(id: string) {
  try {
    const response = (await api.delete(`/trades/${id}`)).data
    return response
  } catch (e: any) {
    return e.response.data
  }
}
