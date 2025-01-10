'use client'

import { useCounterStore } from '@/providers/counter-store-provider'

export default function StoreDemo() {
  const { count, incrementCount, decrementCount } = useCounterStore(
    (state) => state,
  )
  return (
    <div>
      <div>
        Count: {count}
        <hr />
        <button type="button" onClick={() => void incrementCount()}>
          Increment Count
        </button>
        <button type="button" onClick={() => void decrementCount()}>
          Decrement Count
        </button>
      </div>
    </div>
  )
}
