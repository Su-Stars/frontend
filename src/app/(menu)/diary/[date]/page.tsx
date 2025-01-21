import DiaryDetailPage from '@/components/pages/diary-detail-page'

export default async function DiaryDetail({
  params,
}: {
  params: Promise<{ date: string }>
}) {
  const date = (await params).date

  return <DiaryDetailPage date={date} />
}
