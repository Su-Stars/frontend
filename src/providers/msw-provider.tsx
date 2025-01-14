'use client'

import { ReactNode, useEffect, useState } from 'react'

export function MSWProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)

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

    enableMocking().then(() => setIsReady(true))
  }, [])

  if (!isReady) return null

  return <>{children}</>
}
