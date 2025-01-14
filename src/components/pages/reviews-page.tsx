'use client'

import Link from 'next/link'
import { useReviews } from '@/hooks/useReviews'

interface ReviewsPageProps {
  preview?: boolean
  poolId: string
}

export default function ReviewsPage({
  preview = false,
  poolId,
}: ReviewsPageProps) {
  const { data, isLoading, isError } = useReviews()

  return (
    <section>
      <h1>Reviews : </h1>
      {preview && (
        <Link href={`/temp/${poolId}/reviews`}>View all reviews</Link>
      )}
    </section>
  )
}
