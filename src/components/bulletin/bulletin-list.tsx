'use client'

import { Record } from '@/types/bulletin'
import BulletinItem from './bulletin-item'

interface BulletinListProps {
  records: Record[]
}

export default function BulletinList({ records }: BulletinListProps) {
  return (
    <>
      {records
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .map((record: Record) => (
          <BulletinItem record={record} key={record.id} />
        ))}
    </>
  )
}
