import { http, HttpResponse } from 'msw'

export const reviewsHandlers = [
  http.get('http://localhost:9999/api/pools/:pool_id/reviews', () => {
    return HttpResponse.json({
      status: 'success',
      message: '수영장 리뷰 목록 조회 성공',
      data: {
        total: 100, // 전체 리뷰 수
        page: 1,
        limit: 10,
        summary: {
          // 키워드 리뷰 요약
          '적당한 물온도': 2,
          '깨끗한 물': 1,
          // ... 다른 키워드 및 개수
        },
        reviews: [
          {
            id: 1,
            userId: 1,
            nickname: '수영왕',
            content: '물이 깨끗하고 좋았어요.',
            keywords: ['깨끗한 물', '적당한 수온'],
            createdAt: '2023-11-20T10:00:00Z',
            updatedAt: '2023-11-20T10:00:00Z',
          },
          // ... 다른 리뷰 정보
        ],
      },
    })
  }),
  http.post('http://localhost:9999/api/pools/:pool_id/reviews', () => {
    return HttpResponse.json({
      status: 'success',
      message: '수영장 리뷰 작성 성공',
      data: {
        reviewId: 101,
      },
    })
  }),
  http.patch(
    'http://localhost:9999/api/pools/:pool_id/reviews/:review_id',
    (req) => {
      const { review_id } = req.params
      return HttpResponse.json({
        status: 'success',
        message: `리뷰 ID ${review_id} 수정 성공`,
      })
    },
  ),
  http.delete(
    'http://localhost:9999/api/pools/:pool_id/reviews/:review_id',
    (req) => {
      const { review_id } = req.params
      return HttpResponse.json({
        status: 'success',
        message: `리뷰 ID ${review_id} 삭제 성공`,
      })
    },
  ),
]
