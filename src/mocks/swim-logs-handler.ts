import { http, HttpResponse } from 'msw'

export const swimLogsHandlers = [
  http.get('http://localhost:9999/api/logs', ({ request }) => {
    const url = new URL(request.url)
    const year = Number(url.searchParams.get('year'))
    const month = Number(url.searchParams.get('month'))
    const date = url.searchParams.get('date')

    if (date) {
      return HttpResponse.json({
        status: 'success',
        message: '해당 날짜의 수영활동 기록 조회 성공',
        data: {
          year: '2025',
          month: '1',
          day: '1',
          totalSwimLength: 500, // 검색 기간동안 수영한 총 길이
          records: {
            // 결과는 날짜 ASC (오름차순) 으로 정렬되어 반환됩니다.
            '2025-01-01': [
              {
                logId: 1,
                startTime: null,
                endTime: null,
                laneLength: null,
                swimCategory: '자유형',
                swimLength: 100,
                note: null,
                created_at: '2025-01-21T20:51:10.686Z',
              },
              {
                logId: 2,
                startTime: null,
                endTime: null,
                laneLength: null,
                swimCategory: '접영',
                swimLength: 200,
                note: null,
                created_at: '2025-01-21T22:06:44.224Z',
              },
            ],
          },
        },
      })
    }

    return HttpResponse.json({
      status: 'success',
      message: '수영 기록을 가져오는 데 성공했습니다.',
      data: {
        year: '2025',
        month: '1',
        totalSwimLength: 500,
        records: {
          '2025-01-01': [
            {
              logId: 1,
              startTime: null,
              endTime: null,
              laneLength: null,
              swimCategory: '자유형',
              swimLength: 100,
              note: null,
              created_at: '2025-01-21T20:51:10.686Z',
            },
            {
              logId: 2,
              startTime: null,
              endTime: null,
              laneLength: null,
              swimCategory: '접영',
              swimLength: 200,
              note: null,
              created_at: '2025-01-21T22:06:44.224Z',
            },
          ],
          '2025-01-02': [
            {
              logId: 4,
              startTime: null,
              endTime: null,
              laneLength: null,
              swimCategory: '자유형',
              swimLength: 200,
              note: null,
              created_at: '2025-01-22T08:24:26.868Z',
            },
          ],
        },
      },
    })
  }),
]
