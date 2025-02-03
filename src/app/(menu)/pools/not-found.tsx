import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LuHouse } from 'react-icons/lu'

export default function NotFound() {
  return (
    <main className="flex h-[80vh] flex-col items-center justify-center space-y-4">
      <h1 tabIndex={-1}>404</h1>
      <h2>수영장을 찾을 수 없습니다</h2>
      <p className="text-muted-foreground" role="alert">
        요청하신 수영장 정보가 존재하지 않습니다.
      </p>
      <Button asChild>
        <Link href="/" aria-label="메인 페이지로 이동">
          <LuHouse className="mr-2 h-4 w-4" aria-hidden="true" />
          홈으로
        </Link>
      </Button>
    </main>
  )
}
