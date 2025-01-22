export interface IReview {
  id: number
  userId: number
  poolId: number
  poolName: string
  nickname: string
  content: string
  keywords: string[]
  createdAt: string
  updatedAt: string
}

export interface IReviewForm {
  keywords: string[]
  content: string
}
