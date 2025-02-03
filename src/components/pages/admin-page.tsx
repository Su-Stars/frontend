'use client'

import Link from 'next/link'
import { DataTable } from '@/app/(admin)/admin/_components/data-table'
import { columns } from '@/app/(admin)/admin/_components/columns'
import { useSearch } from '@/hooks/use-search'
import { Button } from '@/components/ui/button'
import { ResponsiveDialog } from '@/components/responsive-dialog'
import { LuPlus, LuArrowLeft } from 'react-icons/lu'
import { useState } from 'react'
import PostForm from '@/app/(admin)/admin/_components/post-form'
import { useUserStore } from '@/providers/user-store-provider'
import { notFound } from 'next/navigation'
import { Input } from '@/components/ui/input'

export default function AdminPage() {
  const { user } = useUserStore((state) => state)

  const [isOpen, setIsOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const { searchResults, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSearch({
      region: 'all',
      keyword: keyword || 'all',
    })

  // 비인증 상태일 때 404 페이지로 이동
  if (!user || user.role !== 'admin') {
    notFound()
  }

  return (
    <section className="container mx-auto w-full space-y-2 bg-background py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            size="icon"
            className="mr-2 rounded-full bg-transparent text-black hover:bg-accent"
            asChild
          >
            <Link href="/">
              <LuArrowLeft aria-hidden />
              <span className="sr-only">뒤로 가기</span>
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

      <Input
        type="search"
        placeholder="수영장 이름을 검색하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
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
