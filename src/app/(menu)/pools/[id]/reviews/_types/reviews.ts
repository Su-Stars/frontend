export interface ReviewsResponse {
  total: number
  page: number
  limit: number
  reviews: IReview[]
}

export interface IReview {
  id: number
  poolId: number
  userId: number
  content: string
  keywords?: string[]
  createdAt: string
  updatedAt: string | null
  users: {
    nickname: string
  }
}

export interface IReviewForm {
  keywords: string[]
  content: string
}
