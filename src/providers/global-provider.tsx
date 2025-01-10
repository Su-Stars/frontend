import { ReactNode } from 'react'
import { CounterStoreProvider } from '@/providers/counter-store-provider'

interface GlobalProviderProps {
  children: ReactNode
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return <CounterStoreProvider>{children}</CounterStoreProvider>
}

export default GlobalProvider
