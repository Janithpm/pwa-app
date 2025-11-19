import { headers } from 'next/headers'
import { auth } from './auth'
import type { Session } from 'better-auth/types'


export async function getSession(): Promise<Session | null> {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  
  return session
}

export async function requireAuth() {
  const session = await getSession()
  
  if (!session) {
    throw new Error('Unauthorized')
  }
  
  return session
}

export async function requireAdmin() {
  const session = await requireAuth()
  
  if (session.user.role !== 'admin') {
    throw new Error('Forbidden: Admin access required')
  }
  
  return session
}
