import { http, HttpResponse } from 'msw'

export const dummy = [
  {
    id: 1,
    name: '장안구민회관',
    address: '경기도 수원시 장안구 송원로 101 ',
    thumbnail: 'https://www.suwonudc.co.kr/upload/edit/2016_02_24_094316.jpg',
    isBookMarked: false,

    latitude: 37.2945,
    longitude: 127.0094,
  },
  {
    id: 2,
    name: '수정스포츠센터',
    address: '경기도 수원시 장안구 대평로 128 파크프라자',
    thumbnail:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAzMjJfMjIz%2FMDAxNjE2Mzk1MzQ4MTg1.-mAg6CMxTlpXnz_xQNfV7x_m3jd23c-TAVrGRynjg-og.ap8kPNBzFnAPNp9XeRqVzFJG_xGjLCe-jCJyaiDijsIg.JPEG.ikozen%2F%25BC%25F6%25C1%25A4%25BD%25BA%25C6%25F7%25C3%25F7%25BC%25BE%25C5%25CD.jpg&type=ff332_332',
    isBookMarked: false,

    latitude: 37.2935,
    longitude: 127.0105,
  },
  {
    id: 3,
    name: '아현스포렉스 수영장',
    address: '서울 마포구 마포대로 247',
    thumbnail:
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220411_13%2F1649668383280Cg0tf_JPEG%2FKakaoTalk_20220411_175434662_04.jpg',
    isBookMarked: false,

    latitude: 37.5505,
    longitude: 126.953,
  },
  {
    id: 4,
    name: '스포츠아일랜드 수영장',
    address: '경기도 수원시 팔달구 창룡대로210번길 41 ',
    thumbnail:
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190620_135%2F1561017654985woPuG_PNG%2FrQIlb7N9ElFAqcdHVMLn6MyO.png',
    isBookMarked: false,
    latitude: 37.5101,
    longitude: 127.0668,
  },
  {
    id: 5,
    name: '성일스포렉스 피트니스',
    address: '서울 강동구 성내로15길 33 ',
    thumbnail:
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20230911_240%2F1694416081518p78wY_JPEG%2FKakaoTalk_20230911_160209165_01.jpg',
    isBookMarked: false,
    latitude: 37.5384,
    longitude: 127.1238,
  },
  {
    id: 6,
    name: '목동스포츠센터',
    address: '서울 양천구 목동서로 130 목동스포츠센터',
    thumbnail:
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNTAxMTFfNDIg%2FMDAxNzM2NTcxNjI2NzEy.VAXi3grwXRc0WQKx3qEH4u9whckyPLceF_Tew951lSsg.Zs91gcPGPBUIPUiEdB_Bg9vjuOGLv5qYCLWeh6OTA9Eg.JPEG%2FB1112B1F-14A3-4E21-A53E-51D5D7ECD798.jpeg%3Ftype%3Dw1500_60_sharpen',
    isBookMarked: false,
    latitude: 37.5304,
    longitude: 126.8753,
  },
]

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
    const startIndex = (page - 1) * limit
    const paginatedPools = filteredPools.slice(startIndex, startIndex + limit)

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
