import { Router } from "express";

import { UserController } from "@/controllers/userController";

const userRoutes = Router()
const userController = new UserController()

userRoutes.get("/", userController.read)
userRoutes.post("/", userController.create)
userRoutes.patch("/", userController.update)
userRoutes.delete("/", userController.delete)

export { userRoutes }