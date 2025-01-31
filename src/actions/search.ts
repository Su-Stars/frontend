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
    const response = await fetch(requestUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const json = await response.json()

    if (!response.ok) {
      throw new Error(
        `[${response.status}] ${json.message || '수영장을 찾을 수 없습니다.'}`,
      )
    }

    return json.data
  } catch (error) {
    console.error('Pool fetch error:', error)
    throw error
  }
}
