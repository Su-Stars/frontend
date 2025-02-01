import type { ApiResponse } from '@/types/api'

export interface Pool {
  id: number
  name: string
  address: string
  longitude: number
  latitude: number
  thumbnail?: string
  isBookMarked: boolean
}

export interface PoolSearchData {
  total: number
  page: number
  limit: number
  pools: Pool[]
}

export interface PoolDetail {
  id: number
  name: string
  address: string
  phone: string
  website: string | null
  latitude: number
  longitude: number
  freeSwimLink: string | null
  swimLessonLink: string | null
  laneInfo: string | null
  depthInfo: string | null
  isSoapProvided: boolean | null
  isTowelProvided: boolean | null
  isKickboardAllowed: boolean | null
  isFinsAllowed: boolean | null
  isKickboardRental: boolean | null
  isDivingAllowed: boolean | null
  isPhotoAllowed: boolean | null
  description: string | null
  created_at: string
  updated_at: string
  images: string[]
  thumbnail: string | null
}
