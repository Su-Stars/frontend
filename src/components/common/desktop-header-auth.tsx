'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DesktopHeaderAuth() {
  const pathname = usePathname()
  return (
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
  )
}
