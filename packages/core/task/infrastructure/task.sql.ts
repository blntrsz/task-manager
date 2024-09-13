import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import type { z } from "zod";
import type { Equal, Expect } from "../../util/type.js";
import type { TaskEntitySchema } from "../domain/task.entity.js";

export const taskTable = pgTable("task", {
	id: uuid("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export type InsertTask = typeof taskTable.$inferInsert;
export type SelectTask = typeof taskTable.$inferSelect;

// compile time validation
export type _ = Expect<Equal<z.infer<typeof TaskEntitySchema>, SelectTask>>;
