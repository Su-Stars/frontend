import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { reviewsHandlers } from '@/mocks/reviews-handler'

export const worker = setupWorker(...handlers, ...reviewsHandlers)
