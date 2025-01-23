import { ReactNode } from 'react'
import { ReactQueryProvider } from '@/providers/react-query-provider'
import { MSWProvider } from '@/providers/msw-provider'
import { UserStoreProvider } from '@/providers/user-store-provider'

interface GlobalProviderProps {
  children: ReactNode
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <MSWProvider>
      <ReactQueryProvider>
        <UserStoreProvider>{children}</UserStoreProvider>
      </ReactQueryProvider>
    </MSWProvider>
  )
}

export default GlobalProvider
