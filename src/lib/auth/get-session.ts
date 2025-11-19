import { headers } from 'next/headers'
import { auth } from './auth'
import type { Session, User } from 'better-auth/types'

export async function getSession(): Promise<{ session: Session, user: User } | null> {
  const session = await auth.api.getSession({
    headers: headers()
  })
  return session
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession()
  return session?.user ?? null
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
