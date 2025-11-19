import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url().min(1, 'DATABASE_URL is required'),
  BETTER_AUTH_SECRET: z.string().min(32, 'BETTER_AUTH_SECRET must be at least 32 characters'),
  BETTER_AUTH_URL: z.string().url().min(1, 'BETTER_AUTH_URL is required'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

const envParse = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  NODE_ENV: process.env.NODE_ENV,
})

if (!envParse.success) {
  console.error('❌ Invalid environment variables:')
  console.error(JSON.stringify(envParse.error.format(), null, 2))
  throw new Error('Invalid environment variables')
}

export const env = envParse.data
