import { Region } from '@/lib/constants'
import { create } from 'zustand'

interface searchState {
  region: string
  keyword: string
  selectedRegion: Region | null
  value: string
  setRegion: (region: string) => void
  setKeyword: (keyword: string) => void
  setSelectedRegion: (region: Region | null) => void
  setValue: (value: string) => void
  filterName: string
  setFilterName: (filterName: string) => void
}

export const useSearchStore = create<searchState>((set) => ({
  region: 'all',
  keyword: 'all',
  selectedRegion: null,
  value: '',
  setRegion: (region: string) => set({ region }),
  setKeyword: (keyword: string) => set({ keyword }),
  setSelectedRegion: (selectedRegion: Region | null) => set({ selectedRegion }),
  setValue: (value: string) => set({ value }),
  filterName: '전국',
  setFilterName: (filterName: string) => set({ filterName }),
}))
