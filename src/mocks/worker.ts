import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { reviewsHandlers } from '@/mocks/reviews-handler'

export const server = setupServer(...handlers, ...reviewsHandlers)
