import { ReactNode } from 'react'
import { CounterStoreProvider } from '@/providers/counter-store-provider'
import { ReactQueryProvider } from '@/providers/react-query-provider'
import { MSWProvider } from './msw-provider'

interface GlobalProviderProps {
  children: ReactNode
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <MSWProvider>
      <ReactQueryProvider>
        <CounterStoreProvider>{children}</CounterStoreProvider>
      </ReactQueryProvider>
    </MSWProvider>
  )
}

export default GlobalProvider
