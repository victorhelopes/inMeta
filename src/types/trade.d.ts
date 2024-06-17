interface ITradeBodyCard {
  cardId: string
  type: tradeTypes
}

interface ITrade {
  cards: ITradeBodyCard[]
}

interface ITradeCard extends ITradeBodyCard {
  id: string
  tradeId: string
  card: ICard
}

interface ITradeList {
  id: string
  userId: string
  createdAt: string
  user: { name: string }
  tradeCards: ITradeCard[]
}

interface IGetAllTradesResponse extends IQuery {
  list: ITradeList[]
  more: boolean
}

type tradeTypes = 'OFFERING' | 'RECEIVING'
