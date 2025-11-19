import { getDb } from '@/db/db'
import { usersTable } from '@/db/schemas/test-schema'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/get-session'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET(_request: Request) {
  try {
    await requireAuth()
    const db = getDb()
    const users = await db.select().from(usersTable)

    return NextResponse.json({ users, message: 'success' })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
