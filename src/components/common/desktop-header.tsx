import Link from 'next/link'
import Image from 'next/image'
import DesktopHeaderNav from '@/components/common/desktop-header-nav'
import DesktopHeaderAuth from '@/components/common/desktop-header-auth'

export default function DesktopHeader() {
  return (
    <header className="sticky left-0 right-0 top-0 z-50 hidden w-full items-center justify-center gap-40 bg-white shadow-sm md:flex">
      <Link href="/" className="flex items-center justify-center gap-1">
        <Image src="/logo_image.svg" width={55} height={55} alt="logo" />
        <h1 className="font-pretendard text-5xl font-bold text-blue-500">
          어푸!
        </h1>
      </Link>
      <DesktopHeaderNav />
      <DesktopHeaderAuth />
    </header>
  )
}
