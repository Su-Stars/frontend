import { create } from 'zustand'

interface regionState {
  region: string
  setRegion: (newRegion: string) => void
}

const useRegionStore = create<regionState>((set) => ({
  region: 'all',
  setRegion: (newRegion: string) => {
    set({ region: newRegion })
  },
}))

export default useRegionStore
