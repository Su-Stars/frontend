import { http, HttpResponse } from 'msw'
import { dummy } from './search-handler'

// 두 지점 간의 거리를 계산하는 함수 (Haversine formula)
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // 지구의 반경 (km)
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // 거리 (km)
  return d
}

const deg2rad = (deg) => {
  return deg * (Math.PI / 180)
}

export const nearbyHandlers = [
  http.get('http://localhost:9999/api/v1/pools/nearby', ({ request }) => {
    const url = new URL(request.url)

    const latitude = Number(url.searchParams.get('latitude'))
    const longitude = Number(url.searchParams.get('longitude'))
    const radius = Number(url.searchParams.get('radius')) || 5

    const filteredPools = dummy.filter((pool) => {
      const distance = getDistanceFromLatLonInKm(
        latitude,
        longitude,
        pool.latitude,
        pool.longitude,
      )
      return distance <= radius
    })

    console.log(filteredPools)

    return HttpResponse.json({
      status: 'success',
      message: '인근 수영장 목록 조회 성공',
      data: {
        pools: filteredPools,
      },
    })
  }),
]
