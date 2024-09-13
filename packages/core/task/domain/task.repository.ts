import type { BaseRepository } from "../../common/domain/base.repository.js";
import type { TaskEntity } from "./task.entity.js";

export interface TaskRepository extends BaseRepository<TaskEntity> {}
