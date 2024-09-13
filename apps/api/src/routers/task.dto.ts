import { z } from "@hono/zod-openapi";
import { TaskEntitySchema } from "@task-manager/core/task/domain/task.entity";

export const TaskResponseDto = z
	.object({
		id: TaskEntitySchema.shape.id,
		type: z.literal("tasks").default("tasks"),
		attributes: z.object({
			name: TaskEntitySchema.shape.name.openapi({
				description: "The Name of the Task Entity",
				example: "My Name",
			}),
			description: TaskEntitySchema.shape.description,
			created_at: TaskEntitySchema.shape.createdAt,
			updated_at: TaskEntitySchema.shape.updatedAt,
		}),
	})
	.openapi("TaskEntity");
