import DesktopHeader from '@/components/desktop-header'
import MobileHeader from '@/components/mobile-header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DesktopHeader />
      <main className="bg-gray flex h-full min-h-screen w-full items-center justify-center bg-[#d9d9d9]">
        <div className="min-h-screen w-[640px] bg-white p-2 md:p-4">
          {children}
        </div>
        <MobileHeader />
      </main>
    </div>
  )
}
