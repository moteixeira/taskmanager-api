import { Request, Response, NextFunction } from "express";

class ExampleController {
  async index(request: Request, response: Response){
    return response.status(200).json()
  }
}

export {ExampleController}