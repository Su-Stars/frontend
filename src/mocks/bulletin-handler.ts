import { http, HttpResponse } from 'msw'

export const bulletinHandlers = [
  http.get('http://localhost:9999/api/v1/bulletin', ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page') || '1'
    const limit = url.searchParams.get('limit') || '10'

    return HttpResponse.json({
      status: 'success',
      message: '오수완 정보 성공',
      page: 1,
      limit: 10,
      totalCount: 2,
      data: [
        {
          nickname: 'sustar',
          record: {
            '2025-01-09': [
              {
                startTime: '20:00',
                endTime: '21:00',
                laneLength: null,
                swimCategory: '자유형',
                swimLength: 120,
                note: '너무 오랜만에 수영을 해서 종아리가 배긴 것 같다.',
                created_at: '2025-01-23T05:45:47.283Z',
              },
            ],
          },
        },

        {
          nickname: 'sustar2',
          record: {
            '2025-01-09': [
              {
                startTime: '20:00',
                endTime: '21:30',
                laneLength: null,
                swimCategory: '배형',
                swimLength: 200,
                note: '오늘 수영 완료 !',
                created_at: '2025-01-23T05:45:47.283Z',
              },
            ],
          },
        },
      ],
    })
  }),
]
