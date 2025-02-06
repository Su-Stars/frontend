interface getReviewParams {
  poolId: number
  page: number
  limit: number
}

export const getReview = async ({ poolId, page, limit }: getReviewParams) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/pools/${poolId}/reviews?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )
    const json = await response.json()

    if (!response.ok) {
      throw new Error(`[${response.status}] ${json.message}`)
    }

    return json.data
  } catch (error) {
    console.log(error)
  }
}
