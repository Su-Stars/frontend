import { create } from 'zustand'

interface CenterState {
  center: Center
  setCenter: (newCenter: Center) => void
}

export interface Center {
  lat: number
  lng: number
}

const initialState: Center = {
  lat: 0,
  lng: 0,
}

const useCenterStore = create<CenterState>((set) => ({
  center: initialState,
  setCenter: (newCenter: Center) => {
    set({ center: newCenter })
  },
}))

export default useCenterStore
