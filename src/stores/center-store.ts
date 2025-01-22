import { create } from 'zustand'

interface CenterState {
  center: Center
  setCenter: (newCenter: Center) => void
}

export interface Center {
  lat: number
  lng: number
}

// 초기값을 서울역으로 설정
const initialState: Center = {
  lat: 37.552987017,
  lng: 126.972591728,
}

const useCenterStore = create<CenterState>((set) => ({
  center: initialState,
  setCenter: (newCenter: Center) => {
    set({ center: newCenter })
  },
}))

export default useCenterStore
