import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { reviewsHandlers } from '@/mocks/reviews-handler'
import { searchHandlers } from '@/mocks/search-handler'
import { nearbyHandlers } from '@/mocks/nearby-handler'
import { poolHandlers } from '@/mocks/pool-handler'
import { swimLogsHandlers } from '@/mocks/swim-logs-handler'
import { bulletinHandlers } from '@/mocks/bulletin-handler'

export const worker = setupWorker(
  ...handlers,
  ...reviewsHandlers,
  ...searchHandlers,
  ...nearbyHandlers,
  ...poolHandlers,
  ...swimLogsHandlers,
  ...bulletinHandlers,
)
