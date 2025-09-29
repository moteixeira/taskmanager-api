import { Router } from "express";

import { ExampleController } from "@/controllers/exampleController";
import { exampleMiddleware  } from "@/middlewares/exampleMiddleware";

const exampleRoutes = Router()
const exampleController = new ExampleController()

exampleRoutes.use(exampleMiddleware)

exampleRoutes.get("/", exampleController.index)

export { exampleRoutes }