import api from '../index'

export async function GetTrades(queryParams: IQuery) {
  try {
    const response: IGetAllTradesResponse = (await api.get('/trades', { params: queryParams })).data
    return response
  } catch (e: any) {
    return e.response
  }
}

export async function getAllCards(queryParams: IQuery) {
  try {
    const response = (await api.get('/cards', { params: queryParams })).data
    return response
  } catch (e: any) {
    return e.response
  }
}
