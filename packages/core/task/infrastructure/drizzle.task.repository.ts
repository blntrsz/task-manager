import type { PgliteDatabase } from "drizzle-orm/pglite";
import type { Paginated } from "../../common/domain/base.repository.js";
import { TaskEntity } from "../domain/task.entity.js";
import type { TaskRepository } from "../domain/task.repository.js";
import { taskTable } from "./task.sql.js";
import { eq } from "drizzle-orm";

export class DrizzleTaskRepository implements TaskRepository {
  constructor(
    private readonly db: PgliteDatabase<Record<string, never>>
  ) { }

  async findOne(id: string): Promise<TaskEntity | undefined> {
    await this.db.insert(taskTable).values({
      id,
      description: 'description',
      name: 'name',
    })
    const [entity] = await this.db.select().from(taskTable).where(
      eq(taskTable.id, id)
    ).execute()
    if (!entity) return undefined
    return TaskEntity.fromPlain(entity)
  }

  findAllPaginated(): Promise<Paginated<TaskEntity>> {
    throw new Error("Method not implemented.");
  }

  remove(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  insert(entity: TaskEntity): Promise<TaskEntity> {
    throw new Error("Method not implemented.");
  }
}
