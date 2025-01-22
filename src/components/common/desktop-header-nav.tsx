'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const LINKS = [
  { href: '/', label: '수영장 찾기' },
  { href: '/diary', label: '기록일지' },
  { href: '/bulletin', label: '오수완' },
]

export default function DesktopHeaderNav() {
  const pathname = usePathname()
  return (
    <nav className="flex max-w-6xl items-center justify-around py-2">
      <div className="flex items-center justify-start gap-6">
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
    </nav>
  )
}
