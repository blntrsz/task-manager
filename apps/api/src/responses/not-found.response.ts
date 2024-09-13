import { z } from "@hono/zod-openapi";

export const notFoundErrorSchema = z.object({
	errors: z.array(
		z.object({
			status: z.literal("404"),
			title: z.literal("Not Found"),
			detail: z.literal("The requested resource could not be found."),
		}),
	),
});

export const notFoundError = {
	errors: [
		{
			status: "404",
			title: "Not Found",
			detail: "The requested resource could not be found.",
		},
	],
} satisfies z.infer<typeof notFoundErrorSchema>;
