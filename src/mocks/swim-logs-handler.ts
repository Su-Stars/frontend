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
        data: [
          {
            date: '2025-01-09',
            logId: 1,
            startTime: '14:30',
            endTime: '15:30',
            laneLength: 25,
            totalSwimLength: 1000,
            note: '체력이 많이 좋아진 것 같다',
          },
          {
            date: '2025-01-09',
            logId: 2,
            startTime: '16:00',
            endTime: '17:00',
            laneLength: 25,
            totalSwimLength: 1500,
            note: '오늘은 자유형 연습',
          },
        ],
      })
    }

    return HttpResponse.json({
      status: 'success',
      message: '내 수영활동 기록 조회 성공',
      data: [
        {
          date: '2025-01-09',
          logId: 1,
          startTime: '14:30',
          endTime: '15:30',
          laneLength: 25,
          totalSwimLength: 1000,
          note: '체력이 많이 좋아진 것 같다',
        },
        {
          date: '2025-01-09',
          logId: 2,
          startTime: '16:00',
          endTime: '17:00',
          laneLength: 25,
          totalSwimLength: 1500,
          note: '오늘은 자유형 연습',
        },
      ],
    })
  }),
]
