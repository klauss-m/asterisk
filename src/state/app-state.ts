import { atom } from 'recoil'

export type User = {
  id: number
  name: string
  email: string
  role: 'Administrador' | 'Balconista' | 'Prostituto' | 'Hospede'
}

const userState = atom<User | null>({ key: 'user', default: null })

export { userState }
