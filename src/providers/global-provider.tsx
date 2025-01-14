import { ReactNode } from 'react'
import { CounterStoreProvider } from '@/providers/counter-store-provider'
import { ReactQueryProvider } from '@/providers/react-query-provider'

interface GlobalProviderProps {
  children: ReactNode
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <ReactQueryProvider>
      <CounterStoreProvider>{children}</CounterStoreProvider>
    </ReactQueryProvider>
  )
}

export default GlobalProvider
