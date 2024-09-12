import type { BaseEntity } from "./entity.js";

export interface Paginated<TBaseEntity extends BaseEntity> {
  data: TBaseEntity[]
  page: number
  limit: number
}

export interface BaseRepository<TBaseEntity extends BaseEntity> {
  findOne(id: TBaseEntity['id']): Promise<TBaseEntity | undefined>
  findAllPaginated(options: Omit<Paginated<never>, 'data'>): Promise<Paginated<TBaseEntity>>
  remove(id: TBaseEntity['id']): Promise<void>
  insert(entity: TBaseEntity): Promise<TBaseEntity>
}
