import { Router } from "express";

import { TeamController } from "@/controllers/teamController";

const teamRoutes = Router()
const teamController = new TeamController()

teamRoutes.get("/", teamController.read)
teamRoutes.post("/", teamController.create)
teamRoutes.patch("/", teamController.update)
teamRoutes.delete("/", teamController.delete)

export { teamRoutes }