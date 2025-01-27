import { getBulletin } from '@/actions/bulletin'
import { useInfiniteQuery } from '@tanstack/react-query'

export interface IUserRecord {
  nickname: string
  image_url: null | string
  record: {
    [date: string]: IRecord[]
  }
}

interface IRecord {
  logId: number
  userId: number
  startTime: string
  endTime: string
  laneLength: null | string
  swimCategory: string
  swimLength: number
  note: string
  created_at: string
}

export interface useBulletinResponse {
  status: string
  message: string
  totalCount: number
  page: number
  limit: number
  data: IUserRecord[]
}

export function useBulletin() {
  // 한 번에 10개씩
  const limit = 10

  const {
    isLoading,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<useBulletinResponse>({
    queryKey: ['bulletin'],
    queryFn: async ({ pageParam }) =>
      getBulletin({ limit, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage): number | null => {
      const isLastPage =
        Math.ceil(lastPage.totalCount / limit) === lastPage.page
      return isLastPage ? null : lastPage.page + 1
    },
  })

  const bulletins = data ? data.pages.flatMap((page) => page.data) : []
  const isEmpty = bulletins.length === 0

  return {
    bulletins,
    error,
    isEmpty,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  }
}
