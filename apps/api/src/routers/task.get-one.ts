import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { toResponseDto } from "@task-manager/core/common/domain/entity";
import { db } from "@task-manager/core/common/infrastructure/db";
import { DrizzleTaskRepository } from "@task-manager/core/task/infrastructure/drizzle.task.repository";
import { FindOneTaskUseCase } from "@task-manager/core/task/use-cases/find-one-task.use-case";
import {
	notFoundError,
	notFoundErrorSchema,
} from "../responses/not-found.response";
import { TaskResponseDto } from "./task.dto";

export const getOneTaskRoute = new OpenAPIHono().openapi(
	createRoute({
		path: "/tasks/{id}",
		method: "get",
		request: {
			params: z.object({
				id: z.string(),
			}),
		},
		responses: {
			404: {
				description: "Not found",
				content: {
					"application/json": {
						schema: notFoundErrorSchema,
					},
				},
			},
			200: {
				description: "Get Task Entity by ID",
				content: {
					"application/json": {
						schema: TaskResponseDto,
					},
				},
			},
		},
	}),
	async (c) => {
		const param = c.req.valid("param");
		const useCase = new FindOneTaskUseCase({
			taskRepository: new DrizzleTaskRepository(db),
		});

		const result = await useCase.execute(param);

		if (!result) return c.json(notFoundError, 404);

		return c.json(toResponseDto(result, TaskResponseDto), 200);
	},
);
