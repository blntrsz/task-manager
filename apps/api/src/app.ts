import { swaggerUI } from "@hono/swagger-ui"
import { OpenAPIHono } from "@hono/zod-openapi"
import { getOneTask } from "./routers/task.get-one"

const OPENAPI_ROUTE = '/openapi'

export const app = new OpenAPIHono();

app
  .doc(OPENAPI_ROUTE, {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Task Manager API',
    },
  })
  .get('/swagger', swaggerUI({ url: OPENAPI_ROUTE }))
  .route("/", getOneTask)

