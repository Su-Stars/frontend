import { getBulletin } from '@/actions/bulletin'
import { BulletinResponse } from '@/types/bulletin'
import { useInfiniteQuery } from '@tanstack/react-query'

export function useBulletin() {
  const limit = 10
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isError,
    error,
  } = useInfiniteQuery<BulletinResponse>({
    queryKey: ['bulletin', limit],
    queryFn: async ({ pageParam }) =>
      getBulletin({ limit, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage): number | null => {
      const isLastPage =
        Math.ceil(lastPage.data.totalCount / limit) === lastPage.data.page
      return isLastPage ? null : lastPage.data.page + 1
    },
  })

  const records = data?.pages
    ? data.pages.flatMap((page) => page.data.record)
    : []

  const isEmpty = records.length === 0

  return {
    records,
    isEmpty,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
    isError,
    error,
  }
}
