import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

export type User = {
  id: number
  email: string
  nickname: string
  role: 'user' | 'admin'
  description: string
  image_url: string
  created_at: string
  updated_at: string
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
  return createStore<UserStore>()(
    persist(
      (set) => ({
        ...initState,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'user-storage',
        // 선택적: 특정 필드만 저장
        // partialize: (state) => ({ user: state.user })
      },
    ),
  )
}
