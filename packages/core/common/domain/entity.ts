import get from "lodash/get.js";
import snakeCase from "lodash/snakeCase.js";
import { type ZodTypeAny, z } from "zod";

export const baseEntity = z.object({
	id: z.string().uuid(),
	updatedAt: z.date(),
	createdAt: z.date(),
});

export class BaseEntity implements z.infer<typeof baseEntity> {
	id!: string;
	updatedAt!: Date;
	createdAt!: Date;
}

export type ClassConstructor<T> = {
	new (...args: unknown[]): T;
};

export function fromPlainToClass<T>(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	plain: any,
	EntityConstructor: ClassConstructor<T>,
): T {
	const entity = new EntityConstructor();
	// biome-ignore lint/complexity/noForEach: <explanation>
	Object.keys(plain).forEach((key) => {
		entity[key as keyof T] = plain[key];
	});
	return entity;
}

export function fromClassToPlain<
	TBaseEntity extends BaseEntity,
	TSchema extends ZodTypeAny,
>(cls: TBaseEntity, schema: TSchema) {
	return schema.parse(
		Object.keys(cls).reduce(
			(acc, key) => {
				acc[key] = cls[key as keyof typeof cls];
				return acc;
			},
			{} as Record<string, unknown>,
		),
	);
}

export function toResponseDto<
	TBaseEntity extends BaseEntity,
	TSchema extends ZodTypeAny,
>(cls: TBaseEntity, schema: TSchema) {
	const attributes = Object.keys(cls).reduce(
		(acc, key) => {
			acc[snakeCase(key)] = get(cls, key);
			return acc;
		},
		{} as Record<string, unknown>,
	);

	return schema.parse({
		id: cls.id,
		attributes,
	});
}
