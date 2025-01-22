import { http, HttpResponse } from 'msw'

export const swimLogsHandlers = [
  http.get('http://localhost:9999/api/logs', ({ request }) => {
    const url = new URL(request.url)
    const year = Number(url.searchParams.get('year'))
    const month = Number(url.searchParams.get('month'))
    const date = url.searchParams.get('date')
    setTimeout(() => {}, 5000)
    return HttpResponse.json({
      status: 'success',
      message: '내 수영활동 기록 조회 성공',
      data: {
        year: year,
        month: month,
        totalDays: 5,
        totalLength: 2500,
        records: [
          {
            date: '2025-01-09',
            logs: [
              {
                logId: 1,
                startTime: '14:30',
                endTime: '15:30',
                laneLength: 25,
                totalSwimLength: 1000,
                note: '체력이 많이 좋아진 것 같다',
              },
              {
                logId: 2,
                startTime: '19:30',
                endTime: '20:30',
                laneLength: 25,
                totalSwimLength: 500,
                note: '저녁 수영도 좋네요',
              },
            ],
          },
          {
            date: '2025-01-10',
            logs: [
              {
                logId: 3,
                startTime: '10:30',
                endTime: '11:30',
                laneLength: 25,
                totalSwimLength: 1000,
                note: '아침 수영 상쾌',
              },
            ],
          },
        ],
      },
    })
  }),
]
