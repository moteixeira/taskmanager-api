import { Router } from "express";

import { TeamController } from "@/controllers/teamController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamRoutes = Router()
const teamController = new TeamController()

teamRoutes.get("/", teamController.read)
teamRoutes.post("/",ensureAuthenticated , verifyUserAuthorization(['admin']),teamController.create)
teamRoutes.patch("/:team_id",ensureAuthenticated , verifyUserAuthorization(['admin']), teamController.update)
teamRoutes.delete("/:team_id", ensureAuthenticated , verifyUserAuthorization(['admin']), teamController.delete)

export { teamRoutes }