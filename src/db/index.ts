import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

let db: ReturnType<typeof drizzle> | null = null;

export const getDb = () => {
    if (!db) {
        const sql = neon(process.env.DATABASE_URL!);
        db = drizzle({ client: sql, logger: true });
    }
    return db;
};

export { getDb as db };