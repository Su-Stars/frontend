import { getBulletin } from '@/actions/bulletin'
import BulletinPage from '@/components/pages/bulletin-page'
import { BulletinResponse } from '@/types/bulletin'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export const revalidate = 60

export default async function Bulletin() {
  const limit = 10

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
      },
    },
  })

  await queryClient.prefetchInfiniteQuery<BulletinResponse>({
    queryKey: ['bulletin', limit],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) =>
      getBulletin({ limit, page: pageParam as number }),
    getNextPageParam: (lastPage: any) => {
      const isLastPage =
        Math.ceil(lastPage.data.totalCount / limit) === lastPage.data.page
      return isLastPage ? undefined : lastPage.data.page + 1
    },
    retry: 1,
    staleTime: 60 * 1000,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BulletinPage />
    </HydrationBoundary>
  )
}
