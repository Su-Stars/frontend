import { Coordinates } from '@/types/coordinate'
import { create } from 'zustand'

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
