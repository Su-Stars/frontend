interface getBulletinProps {
  limit: number
  page: number
}

export const getBulletin = async ({ limit, page }: getBulletinProps) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bulletin?page=${page}&limit=${limit}`,
    )

    if (!res.ok) {
      throw new Error('네트워크 에러')
    }

    const json = await res.json()
    return json
  } catch (error) {
    console.error('getBulletin fetch error:', error)
    let errorMessage = '오수완 데이터 패칭 중 에러가 발생했습니다.'
    if (error instanceof Error) {
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
