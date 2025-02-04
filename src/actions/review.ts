interface getReviewParams {
  poolId: number
  page: number
  limit: number
}

export const getReview = async ({ poolId, page, limit }: getReviewParams) => {
  try {
    const response = await fetch(
      `https://nest-aws.site/api/v1/pools/${poolId}/reviews?page=${page}&limit=${limit}`,
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
