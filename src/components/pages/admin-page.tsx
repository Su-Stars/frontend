'use client'

import Link from 'next/link'
import { DataTable } from '@/app/(admin)/admin/_components/data-table'
import { columns } from '@/app/(admin)/admin/_components/columns'
import { useSearch } from '@/hooks/use-search'
import { Button } from '@/components/ui/button'
import { ResponsiveDialog } from '../responsive-dialog'
import { LuPlus, LuArrowLeft } from 'react-icons/lu'
import { useState } from 'react'
import PostForm from '@/app/(admin)/admin/_components/post-form'

export default function AdminPage() {
  const { searchResults, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSearch({
      region: 'all',
      keyword: 'all',
    })
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="container mx-auto w-full space-y-2 bg-background py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-transparent text-black hover:bg-accent"
            asChild
          >
            <Link href="/diary">
              <LuArrowLeft />
            </Link>
          </Button>
          <h1>수영장 목록</h1>
        </div>
        <Button
          variant="primary"
          className="mb-4"
          onClick={() => setIsOpen(true)}
        >
          <LuPlus className="mr-2" />
          수영장 추가하기
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={searchResults}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="수영장 추가하기"
      >
        <PostForm setIsOpen={setIsOpen} />
      </ResponsiveDialog>
    </section>
  )
}
