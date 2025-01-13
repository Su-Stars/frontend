import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="text-md flex w-full items-center justify-center bg-white font-bold">
      <nav className="flex w-[1280px] items-center justify-center py-2">
        <Link href="/" className="border-red flex w-[240px] items-center gap-4">
          <Image src="/logo_image.svg" width={50} height={50} alt="logo" />
          <Image src="/logo_title.svg" width={100} height={50} alt="title" />
        </Link>
        <ul className="flex w-[640px] items-center justify-start gap-6 px-6">
          <li>
            <Link href="/">수영장 찾기</Link>
          </li>
          <li>
            <Link href="/diary">기록일지</Link>
          </li>
          <li>
            <Link href="/bulletin">오수완</Link>
          </li>
        </ul>
        <div className="flex w-[240px] pl-8">
          <Link href="/login" className="">
            로그인
          </Link>
        </div>
      </nav>
    </header>
  )
}
