import { create } from 'zustand'

export interface Coordinates {
  lat: number
  lng: number
}

interface regionState {
  center: Coordinates | null
  setCenter: (newCenter: Coordinates) => void
}

const useRegionStore = create<regionState>((set) => ({
  center: null,
  setCenter: (newCenter: Coordinates) => {
    set({ center: newCenter })
  },
}))

export default useRegionStore
