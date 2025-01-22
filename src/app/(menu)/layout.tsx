import DesktopHeader from '@/components/common/desktop-header'
import MobileHeader from '@/components/common/mobile-header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 데스크톱 환경에서만 표시되는 헤더 */}
      <DesktopHeader />

      {/* 메인 컨텐츠 영역 */}
      <main className="flex h-full min-h-screen w-full items-center justify-center bg-[rgb(247,247,247)]">
        <div className="min-h-screen w-[640px] bg-white px-6 pb-6 pt-2 shadow-sm">
          {children}
        </div>
      </main>

      {/* 모바일 환경에서만 표시되는 헤더 */}
      <MobileHeader />
    </>
  )
}
