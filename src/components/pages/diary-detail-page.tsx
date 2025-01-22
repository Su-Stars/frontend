'use client'

import { useSwimLogs } from '@/hooks/useSwimLogs'

interface DiaryDetailPageProps {
  date: string
}

export default function DiaryDetailPage({ date }: DiaryDetailPageProps) {
  const { data, isPending, isError, error } = useSwimLogs({
    year: Number(date.split('-')[0]),
    month: Number(date.split('-')[1]),
    date: date.split('-')[2],
  })

  return (
    <div className="flex flex-col space-y-2">
      <h2 className="mx-auto text-xl font-semibold">{date}</h2>
      {isPending && <p>Loading...</p>}
      {isError && (
        <p>Error: {error ? error.message : 'An unknown error occurred'}</p>
      )}
    </div>
  )
}
