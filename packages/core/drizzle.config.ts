import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  driver: 'pglite',
  dbCredentials: {
    url: "file://postgres.db"
  },
  schema: "./**/*.sql.ts",
  out: "./migrations",
});
