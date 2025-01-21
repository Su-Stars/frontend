import { dummy } from '@/lib/dummy'
import { http, HttpResponse } from 'msw'

export const poolHandlers = [
  http.get('http://localhost:9999/api/v1/pools/:pool_id', ({ params }) => {
    console.log(params.id)
    const pool = dummy.find((pool) => pool.id === Number(params.pool_id))
    console.log(pool)
    if (!pool) {
      return new HttpResponse(
        JSON.stringify({
          status: 'error',
          message: '수영장을 찾을 수 없습니다.',
          data: null,
        }),
        {
          status: 404,
        },
      )
    }

    return HttpResponse.json({
      status: 'success',
      message: '수영장 정보 조회 성공',
      data: pool,
    })
  }),
]
