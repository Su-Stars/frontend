import Link from 'next/link'
import { LuHouse } from 'react-icons/lu'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center">
      <h1 id="error-title" tabIndex={-1}>
        404
      </h1>
      <h2>페이지를 찾을 수 없습니다</h2>
      <p className="text-muted-foreground" role="alert">
        요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.
      </p>
      <Link href="/" aria-label="메인 페이지로 이동">
        <Button variant="default" className="mt-4">
          <LuHouse className="mr-2 h-4 w-4" aria-hidden="true" />
          홈으로 돌아가기
        </Button>
      </Link>
    </main>
  )
}
