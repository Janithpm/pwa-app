import { auth } from '@/lib/auth/auth'
import { toNextJsHandler } from 'better-auth/next-js'

const authHandler = toNextJsHandler(auth.handler)
export const { GET, POST } = authHandler
