import { Router } from "express";

import { SessionsController } from "@/controllers/sessionsController";
import { exampleMiddleware  } from "@/middlewares/exampleMiddleware";

const sessionsRoutes = Router()
const sessionsController = new SessionsController()

sessionsRoutes.use(exampleMiddleware)

sessionsRoutes.post("/", sessionsController.create)


export { sessionsRoutes }