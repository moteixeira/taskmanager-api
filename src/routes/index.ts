import { Router } from "express";

import { exampleRoutes } from "./exampleRoutes";


const routes = Router()

routes.use("/example", exampleRoutes)


export {routes}