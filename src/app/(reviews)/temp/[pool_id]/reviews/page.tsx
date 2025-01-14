import ReviewsPage from '@/components/pages/reviews-page'

interface PageProps {
  params: Promise<{ pool_id: string }>
}

export default async function Reviews({ params }: PageProps) {
  const poolId = (await params).pool_id
  return <ReviewsPage poolId={poolId} />
}
