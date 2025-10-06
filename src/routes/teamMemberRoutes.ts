import { Router } from "express";

import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { TeamMemberController } from "@/controllers/teamMemberController";

const teamMemberRoutes = Router()
const teamMemberController = new TeamMemberController()

teamMemberRoutes.post("/:team_id",ensureAuthenticated, verifyUserAuthorization(['admin']), teamMemberController.create)
teamMemberRoutes.delete("/:team_id",ensureAuthenticated, verifyUserAuthorization(['admin']), teamMemberController.delete)

export { teamMemberRoutes }