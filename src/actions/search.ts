interface searchPoolsParams {
  region: string
  keyword: string
  page: number
  limit: number
}

export const searchPools = async ({
  region,
  keyword,
  page,
  limit,
}: searchPoolsParams) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/pools`)
    url.search = new URLSearchParams({
      region,
      keyword,
      page: String(page),
      limit: String(limit),
    }).toString()

    const requestUrl = url.toString()
    const res = await fetch(requestUrl)

    if (!res.ok) {
      throw new Error('네트워크 에러')
    }

    const json = await res.json()
    return json.data
  } catch (error) {
    console.error('Search error:', error)
    return {
      total: 0,
      page: 0,
      limit: 0,
      pools: [],
    }
  }
}
