import { dummy } from '@/lib/dummy'
import { http, HttpResponse } from 'msw'

export const searchHandlers = [
  http.get('http://localhost:9999/api/v1/pools', ({ request }) => {
    const url = new URL(request.url)

    const keyword = decodeURIComponent(url.searchParams.get('keyword') || 'all')
    const region = decodeURIComponent(url.searchParams.get('region') || 'all')
    const page = Number(url.searchParams.get('page')) || 1
    const limit = Number(url.searchParams.get('limit')) || 10

    let filteredPools = [...dummy]
    // 검색 조건 적용
    if (keyword !== 'all') {
      filteredPools = filteredPools.filter((pool) =>
        pool.name.toLowerCase().includes(keyword.toLowerCase()),
      )
    }

    if (region !== 'all') {
      filteredPools = filteredPools.filter((pool) =>
        pool.address.toLowerCase().includes(region.toLowerCase()),
      )
    }

    // Todo : 무한스크롤 기능 추가
    // 페이징 처리
    // const startIndex = (page - 1) * limit
    // const paginatedPools = filteredPools.slice(startIndex, startIndex + limit)

    return HttpResponse.json({
      status: 'success',
      message: '지역별 수영장 목록 조회 성공',
      data: {
        total: filteredPools.length,
        page,
        limit,
        pools: filteredPools,
      },
    })
  }),
]
