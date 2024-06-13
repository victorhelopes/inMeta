import { api } from '../index.ts'

interface ICard {
  id: string
  cardId: string
  tradeId: string
  type: string
  card: {
    id: string
    name: string
    description: string
    imageUrl: string
    createdAt: Date
  }
}

interface ITrade {
  id: string
  userId: string
  createdAt: Date
  user: {
    name: string
  }
  tradeCards: ICard[]
}

interface IGetTradesQuery {
  rpp: number
  page: number
}

export interface IGetTradesResponse extends IGetTradesQuery {
  list: ITrade[]
  more: boolean
}

export async function GetTrades(queryParams: IGetTradesQuery) {
  try {
    const response: IGetTradesResponse = (await api.get('/trades', { params: queryParams })).data
    return response
  } catch (e: any) {
    return e.response.data.message
  }
}
