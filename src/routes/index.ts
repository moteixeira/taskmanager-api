import { Router } from "express";

import { userRoutes } from "./userRoutes";
import { sessionRoutes } from "./sessionRoutes";
import { teamRoutes } from "./teamRoutes";
import { teamMemberRoutes } from "./teamMemberRoutes";


const routes = Router()

routes.use("/user", userRoutes)
routes.use("/session", sessionRoutes)
routes.use("/team", teamRoutes)
routes.use("/team-member",teamMemberRoutes)


export {routes}