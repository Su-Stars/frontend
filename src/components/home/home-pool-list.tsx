import { LuSearch } from 'react-icons/lu'
import PoolCard from './home-pool-item'
import type { Pool } from '@/types/pools'

interface HomePoolListProps {
  total: number
  searchResults: Pool[]
}

export default function HomePoolList({
  total,
  searchResults,
}: HomePoolListProps) {
  return (
    <>
      <h3>
        검색 결과 <span className="text-blue-500"> {total}</span>
      </h3>
      {total === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-muted-foreground">
          <LuSearch className="h-12 w-12" />
          <h3>검색 결과가 없습니다</h3>
          <p>다른 검색어로 다시 시도해보세요</p>
        </div>
      ) : (
        searchResults.map((pool: Pool) => (
          <PoolCard pool={pool} key={pool.id} />
        ))
      )}
    </>
  )
}
