import { Router } from "express";

import { userRoutes } from "./userRoutes";
import { sessionsRoutes } from "./sessionsRoutes";


const routes = Router()

routes.use("/user", userRoutes)
routes.use("/sessions", sessionsRoutes)


export {routes}