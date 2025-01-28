export const getBookmark = async (poolId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/pools/${poolId}/bookmarked`,
    {
      credentials: 'include',
      method: 'GET',
    },
  )
  const json = await response.json()

  if (json.status !== 'success') {
    const status = response.status
    throw new Error(`[${status} 에러] ${json.message}`)
  }

  return json
}

export const postBookmark = async (poolId: number) => {
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

  if (json.status !== 'success') {
    const status = response.status
    throw new Error(`[${status} 에러] ${json.message}`)
  }
  return json
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
