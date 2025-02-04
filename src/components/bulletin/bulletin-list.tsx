'use client'

import { Record } from '@/types/bulletin'
import BulletinItem from './bulletin-item'

interface BulletinListProps {
  records: Record[]
}

export default function BulletinList({ records }: BulletinListProps) {
  return (
    <>
      {records.map((record: Record) => (
        <BulletinItem record={record} key={record.id} />
      ))}
    </>
  )
}
