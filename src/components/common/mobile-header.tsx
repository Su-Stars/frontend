'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { LuHouse, LuNotepadText, LuUser } from 'react-icons/lu'

const LINKS = [
  { href: '/', label: '홈', icon: LuHouse },
  { href: '/diary', label: '기록', icon: LuNotepadText },
  { href: '/my-page', label: 'MY', icon: LuUser },
]

export default function MobileHeader() {
  const pathname = usePathname()

  return (
    <header className="fixed bottom-0 left-0 right-0 z-50 flex w-full items-center bg-white py-1 shadow-inner md:hidden">
      <nav className="mx-auto flex w-full max-w-sm items-center justify-around">
        {LINKS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center justify-center gap-1"
          >
            <div className="flex h-12 w-12 flex-col items-center justify-center space-y-0.5 rounded-full hover:bg-gray-100">
              <Icon
                className={clsx('h-5 w-5 text-gray-600 hover:text-primary', {
                  'text-blue-500': pathname === href,
                })}
              />
              <span
                className={clsx(
                  'text-sm font-semibold text-gray-600 hover:text-primary',
                  { 'text-blue-500': pathname === href },
                )}
              >
                {label}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </header>
  )
}
