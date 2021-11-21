import { atom } from 'recoil'

export type UserRole =
  | 'Governanta'
  | 'Balconista'
  | 'Hospede'
  | 'Gerente'
  | 'Cozinheiro'
  | 'Auxiliar Geral'

export type User = {
  id: number
  name: string
  email: string
  role?: UserRole
}

const userState = atom<User | null>({ key: 'user', default: null })

export { userState }
