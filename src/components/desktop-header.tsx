'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const LINKS = [
  { href: '/', label: '수영장 찾기' },
  { href: '/diary', label: '기록일지' },
  { href: '/bulletin', label: '오수완' },
]

export default function DesktopHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky left-0 right-0 top-0 z-50 hidden w-full items-start bg-white shadow-sm md:flex">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-around py-2">
        <div className="flex items-center justify-start gap-6">
          <Link href="/" className="flex items-center justify-center gap-1">
            <Image src="/logo_image.svg" width={55} height={55} alt="logo" />
            <h1 className="font-bagle-fat-one text-5xl text-blue-500">어푸!</h1>
          </Link>
          <ul className="flex items-center justify-start gap-6 px-6">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    'font-bold text-gray-600 decoration-1 underline-offset-4 hover:text-blue-700 hover:underline',
                    { 'text-blue-700': pathname === href },
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* TODO : 로그인 상태에 따라 렌더링을 달리합니다. */}
        <div className="flex items-center justify-end">
          <Link
            href={'/login'}
            className={clsx(
              'font-bold text-gray-600 decoration-1 underline-offset-4 hover:text-blue-700 hover:underline',
              { 'text-blue-700': pathname === '/login' },
            )}
          >
            로그인
          </Link>
        </div>
      </nav>
    </header>
  )
}
