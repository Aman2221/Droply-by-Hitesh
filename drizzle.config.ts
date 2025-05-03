import * as dotenv from "dotenv"
import { defineConfig } from "drizzle-kit"

dotenv.config({ path: ".env.local" })


if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
    throw new Error("Databases URL is not set in .env")
}

export default defineConfig({
    schema: "./lib/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DATABASE_URL!,
    },
    migrations: {
        table: "__drizzle_migration",
        schema: "public",
    },
    verbose: true,
    strict: true
})