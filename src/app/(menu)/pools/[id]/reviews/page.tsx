import ReviewsPage from '@/components/pages/reviews-page'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const poolId = (await params).id

  return (
    <>
      <h2>Pool page {poolId}</h2>
      <ReviewsPage poolId={poolId} />
    </>
  )
}
