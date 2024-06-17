interface ILogin {
  email: string
  password: string
}

interface INewUser extends ILogin {
  name: string
}

interface IUserData {
  id: string
  name: string
  email: string
  card: ICard[]
}
