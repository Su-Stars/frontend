import { create } from 'zustand'

export interface Coordinates {
  lat: number
  lng: number
}

interface centerState {
  center: Coordinates | null
  setCenter: (newCenter: Coordinates) => void
}

const useCenterStore = create<centerState>((set) => ({
  center: null,
  setCenter: (newCenter: Coordinates) => {
    set({ center: newCenter })
  },
}))

export default useCenterStore
