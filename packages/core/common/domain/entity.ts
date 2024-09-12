import { z, type ZodTypeAny } from 'zod'
import get from 'lodash/get.js'
import snakeCase from 'lodash/snakeCase.js'

export const baseEntity = z.object({
  id: z.string().uuid(),
  updatedAt: z.date(),
  createdAt: z.date()
})

export class BaseEntity implements z.infer<typeof baseEntity> {
  id!: string
  updatedAt!: Date
  createdAt!: Date
}

export type ClassConstructor<T> = {
  new(...args: any[]): T;
};

export function fromPlainToClass<T>(plain: any, EntityConstructor: ClassConstructor<T>): T {
  const entity = new EntityConstructor();
  Object.keys(plain).forEach((key) => {
    entity[key as keyof T] = plain[key]
  })
  return entity
}

export function toResponseDto<TBaseEntity extends BaseEntity, TSchema extends ZodTypeAny>(cls: TBaseEntity, schema: TSchema) {
  const attributes = Object.keys(cls).reduce((acc, key) => {
    acc[snakeCase(key)] = get(cls, key)
    return acc
  }, {} as Record<string, any>)

  return schema.parse({
    id: cls.id,
    attributes,
  })
}
