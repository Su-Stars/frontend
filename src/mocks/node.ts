import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { poolHandlers } from './pool-handler'

export const server = setupServer(...handlers, ...poolHandlers)
