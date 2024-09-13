import { z } from "zod";
import {
	BaseEntity,
	baseEntity,
	fromPlainToClass,
} from "../../common/domain/entity.js";

export const TaskEntitySchema = baseEntity.extend({
	name: z.string(),
	description: z.string(),
});

export class TaskEntity
	extends BaseEntity
	implements z.infer<typeof TaskEntitySchema>
{
	name!: string;
	description!: string;

	static fromPlain(plain: z.infer<typeof TaskEntitySchema>) {
		const parsedPlain = TaskEntitySchema.parse(plain);

		return fromPlainToClass(parsedPlain, TaskEntity);
	}

	toPlain() {
		return TaskEntitySchema.parse(
			Object.keys(this).reduce(
				(acc, key) => {
					acc[key] = this[key as keyof typeof this];
					return acc;
				},
				{} as Record<string, unknown>,
			),
		);
	}
}
