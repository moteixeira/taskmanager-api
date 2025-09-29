import express from "express"
import "express-async-errors"

import { errorHandling } from "./middlewares/errorHandling"
import { routes } from "./routes"


const app = express()

app.use(express.json())

//Import de 
app.use(routes)

//Tratamento de exceçoes
app.use(errorHandling)

export {app}