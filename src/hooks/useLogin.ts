import { useRecoilState } from 'recoil'

import { userState } from '../state/app-state'

export function useLogin() {
  const [user, setUser] = useRecoilState(userState)

  async function logoff() {
    setUser(null)
  }

  return { user, setUser, logoff }
}
