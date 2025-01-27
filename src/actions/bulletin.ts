interface getBulletinProps {
  limit: number
  page: number
}

export const getBulletin = async ({ limit, page }: getBulletinProps) => {
  try {
    const res = await fetch(
      `http://localhost:9999/api/v1/bulletin?page=${page}&limit=${limit}`,
    )

    if (!res.ok) {
      throw new Error('네트워크 에러')
    }

    const json = await res.json()
    return json
  } catch (error) {
    console.log(error)
    return {
      status: 'fail',
      message: '오수완 정보 실패',
      totalCount: 0,
      page: 0,
      limit: 0,
      data: [],
    }
  }
}
