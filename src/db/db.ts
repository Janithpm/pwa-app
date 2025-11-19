import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schemas'
import { env } from '@/lib/env'

let db: ReturnType<typeof drizzle> | null = null

export const getDb = () => {
  if (!db) {
    const sql = neon(env.DATABASE_URL)
    db = drizzle({ client: sql, logger: true, schema })
  }
  return db
}

export { getDb as db }
