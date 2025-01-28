import { useQuery } from '@tanstack/react-query'

interface useMyBookmarksPrams {
  user: boolean
}

interface BookmarkData {
  total: number
  favorite: BookmarkI[]
}

export interface BookmarkI {
  id: number
  pool: {
    id: number
    name: string
    address: string
    img_url?: string
  }
  created_at: string
}

export const useMyBookmarks = ({ user }: useMyBookmarksPrams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['my-bookmarks'],
    queryFn: async () => {
      const response = await fetch('https://nest-aws.site/api/v1/bookmarks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error(`[${response.status}] ${json.message}`)
      }

      return json.data as BookmarkData
    },
    enabled: user,
  })

  return { data, isLoading, isError }
}
