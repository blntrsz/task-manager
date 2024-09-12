import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { FindOneTaskUseCase } from '@task-manager/core/task/use-cases/find-one-task.use-case'
import { DrizzleTaskRepository } from '@task-manager/core/task/infrastructure/drizzle.task.repository'
import { db } from '@task-manager/core/common/infrastructure/db'
import { toResponseDto } from "@task-manager/core/common/domain/entity";
import { TaskResponseDto } from "./task.dto";

export const getOneTask = new OpenAPIHono().openapi(
  createRoute({
    path: '/tasks/{id}',
    method: "get",
    request: {
      params: z.object({
        id: z.string()
      })
    },
    responses: {
      404: {
        description: 'Not found',
        content: {
          "application/json": {
            schema: z.object({
              message: z.string()
            })
          }
        }
      },
      200: {
        description: 'Get Task Entity by ID',
        content: {
          'application/json': {
            schema: TaskResponseDto
          }
        }
      }
    }
  }),
  async (c) => {
    const param = c.req.valid('param')
    const useCase = new FindOneTaskUseCase({
      taskRepository: new DrizzleTaskRepository(db)
    })

    const result = await useCase.execute({
      id: param.id
    })

    if (!result) return c.json({
      message: 'Not Found'
    }, 404)

    return c.json(toResponseDto(result, TaskResponseDto), 200)
  }
)
