import type { PgliteDatabase } from "drizzle-orm/pglite";
import type { Paginated } from "../../common/domain/base.repository.js";
import { TaskEntity, TaskEntitySchema } from "../domain/task.entity.js";
import type { TaskRepository } from "../domain/task.repository.js";
import { taskTable } from "./task.sql.js";
import { eq } from "drizzle-orm";
import type { z } from "zod";

export class DrizzleTaskRepository implements TaskRepository {
  constructor(
    private readonly db: PgliteDatabase<Record<string, never>>
  ) { }

  async findOne(id: string): Promise<TaskEntity | undefined> {
    const [entity] = await this.db.select().from(taskTable).where(
      eq(taskTable.id, id)
    ).execute()
    if (!entity) return undefined
    return TaskEntity.fromPlain(entity)
  }

  async findAllPaginated({ limit, page }: { page: number, limit: number }): Promise<Paginated<TaskEntity>> {
    const data = await this.db.select().from(taskTable).offset(limit * page).limit(limit + 1).execute()

    return {
      data: data.slice(0, limit).map(task => TaskEntity.fromPlain(task)),
      limit,
      page,
    }
  }

  async remove(id: string): Promise<void> {
    await this.db.delete(taskTable).where(
      eq(taskTable.id, id)
    ).execute()
  }

  async insert(entity: TaskEntity): Promise<TaskEntity> {
    const [createdEntity] = await this.db.insert(taskTable).values(entity.toPlain()).returning().execute()
    if (!createdEntity) throw new Error('Could not be created!')
    return TaskEntity.fromPlain(createdEntity)
  }

  async update(partialEntity: Partial<z.infer<typeof TaskEntitySchema>>) {
    const [createdEntity] = await this.db.update(taskTable).set(partialEntity).returning().execute()
    if (!createdEntity) throw new Error('Could not be created!')
    return TaskEntity.fromPlain(createdEntity)
  }
}
