import { TaskController } from "@/controllers/taskController";
import { Router } from "express";


const taskRoutes = Router()
const taskController = new TaskController()

taskRoutes.get("/", taskController.read)
taskRoutes.post("/", taskController.create)
taskRoutes.patch("/", taskController.update)
taskRoutes.delete("/", taskController.delete)


export { taskRoutes }