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
    let errorMessage = '수영장을 찾는 중 에러가 발생했습니다.'
    if (error instanceof Error) {
      // 네트워크 오류 또는 서버가 꺼진 경우
      if (error.message.includes('Failed to fetch')) {
        errorMessage =
          '서버와의 통신에 실패했습니다. 서버가 실행 중인지 확인하거나 네트워크 연결을 확인해주세요.'
      } else {
        errorMessage = error.message
      }
    }
    throw new Error(errorMessage)
  }
}
