import { http, HttpResponse } from 'msw'
import { dummy } from './search-handler'

export const nearbyHandlers = [
  http.get('http://localhost:9999/api/v1/pools/nearby', ({ request }) => {
    const url = new URL(request.url)

    const latitude = Number(url.searchParams.get('latitude'))
    const longitude = Number(url.searchParams.get('longitude'))
    const radius = Number(url.searchParams.get('radius')) || 5

    let filteredPools = dummy.filter((pool) => {
      const lng = pool.longitude
      const lat = pool.latitude
      const distance = Math.sqrt(
        longitude * longitude - lng * lng + (latitude * latitude - lat * lat),
      )
      // distance가 radius km 이내이면
      return distance <= radius
    })

    return HttpResponse.json({
      status: 'success',
      message: '인근 수영장 목록 조회 성공',
      data: {
        pools: filteredPools,
      },
    })
  }),
]
