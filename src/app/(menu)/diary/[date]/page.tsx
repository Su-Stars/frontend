import DiaryDetailPage from '@/components/pages/diary-detail-page'
import { notFound } from 'next/navigation'

const isValidDateFormat = (date: string) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  return dateRegex.test(date)
}

export default async function DiaryDetail({
  params,
}: {
  params: Promise<{ date: string }>
}) {
  const date = (await params).date

  if (!isValidDateFormat(date)) {
    notFound()
  }

  return <DiaryDetailPage date={date} />
}
