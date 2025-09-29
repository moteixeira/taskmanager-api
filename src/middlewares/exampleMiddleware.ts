import { Request, Response, NextFunction } from "express";

import { authConfig } from "@/configs/auth";

import { AppError } from "@/utils/AppError";

function exampleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
){
  try{
   // Lógica do middleware
    return next()
  }catch{
    throw new AppError("Example middleware error", 400)
  }

}

export { exampleMiddleware }