'use client'

import { ReactNode, useEffect } from 'react'

export function MSWProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    async function enableMocking() {
      if (
        typeof window !== 'undefined' &&
        process.env.NODE_ENV === 'development'
      ) {
        const { worker } = await import('@/mocks/browser')
        await worker.start()
      }
    }

    enableMocking()
  }, [])

  return <>{children}</>
}
