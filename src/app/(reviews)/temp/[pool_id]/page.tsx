import ReviewsPage from '@/components/pages/reviews-page'

export default async function Page({
  params,
}: {
  params: Promise<{ pool_id: string }>
}) {
  const poolId = (await params).pool_id

  return (
    <>
      <h2>Pool page {poolId}</h2>
      <ReviewsPage preview poolId={poolId} />
    </>
  )
}
