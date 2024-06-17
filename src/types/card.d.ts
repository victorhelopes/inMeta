interface ICard {
  id: string
  name: string
  description: string
  imageUrl: string
  createdAt: string
}

interface IGetAllCardsResponse extends IQuery {
  list: ICard[]
  more: boolean
}

interface IPostCardBody {
  cardIds: string[]
}
