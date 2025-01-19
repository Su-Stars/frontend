import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { reviewsHandlers } from '@/mocks/reviews-handler'
import { searchHandlers } from '@/mocks/search-handler'
import { nearbyHandlers } from './nearby-handler'
import { poolHandlers } from './pool-handler'

export const worker = setupWorker(
  ...handlers,
  ...reviewsHandlers,
  ...searchHandlers,
  ...nearbyHandlers,
  ...poolHandlers,
)
