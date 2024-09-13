import { join } from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";

const client = new PGlite();
export const db = drizzle(client);

await migrate(db, {
	migrationsFolder: join(import.meta.dirname, "../../migrations"),
});
