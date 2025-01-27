export const getBookmark = async (poolId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/pools/${poolId}/bookmarked`,
      {
        credentials: 'include',
        method: 'GET',
      },
    )
    const json = await response.json()

    return json
  } catch (error) {
    console.log(error)
    return false
  }
}

export const postBookmark = async (poolId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ poolId }),
      },
    )
    const json = await response.json()
    console.log(json)

    if (json.status !== 'success') {
      throw new Error(json.message)
    }

    return json
  } catch (error) {
    return false
  }
}

export const deleteBookmark = async (poolId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks/${poolId}`,
    {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  if (!response.ok) {
    const status = response.status
    const message = (await response.json()).message

    throw new Error(`[${status} 에러] ${message}`)
  }

  const json = await response.json()
  return json
}
