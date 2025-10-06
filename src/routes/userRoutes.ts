import { Router } from "express";

import { UserController } from "@/controllers/userController";
import { exampleMiddleware  } from "@/middlewares/exampleMiddleware";

const userRoutes = Router()
const userController = new UserController()

userRoutes.use(exampleMiddleware)

userRoutes.get("/", userController.read)
userRoutes.post("/", userController.create)
userRoutes.patch("/", userController.update)
userRoutes.delete("/", userController.delete)

export { userRoutes }