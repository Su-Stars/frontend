'use client'

import BulletinList from '../bulletin/bulletin-list'

export default function BulletinPage() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">오수완</h2>
      <BulletinList />
    </div>
  )
}
