import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db/db";

export const auth = betterAuth({
    database: drizzleAdapter(db(), {
        provider: "pg",
    }),
    rateLimit: {
        storage: "database",
        points: 10,
        duration: 60,
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5,
        }
    },
    plugins: [nextCookies()],
    emailAndPassword: {
        enabled: true,
    },
});