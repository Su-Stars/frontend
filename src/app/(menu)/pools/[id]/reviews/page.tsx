import ReviewsPage from '@/components/pages/reviews-page'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const poolId = Number((await params).id)

  return <ReviewsPage poolId={poolId} />
}
