import { ReactNode } from 'react'
import { CounterStoreProvider } from '@/providers/counter-store-provider'
import { MSWProvider } from './msw-provider'

interface GlobalProviderProps {
  children: ReactNode
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <MSWProvider>
      <CounterStoreProvider>{children}</CounterStoreProvider>
    </MSWProvider>
  )
}

export default GlobalProvider
