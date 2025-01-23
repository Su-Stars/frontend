import { createStore } from 'zustand/vanilla'

export type User = {
  id: number
  email: string
  nickname: string
  role: 'user' | 'admin'
}

export type UserState = {
  user: User | null
}

export type UserActions = {
  setUser: (user: UserState['user']) => void
  clearUser: () => void
}

export type UserStore = UserState & UserActions

export const initUserStore = (): UserState => {
  return { user: null }
}

export const defaultInitState: UserState = {
  user: null,
}

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
  }))
}
