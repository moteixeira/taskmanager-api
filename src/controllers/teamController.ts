import { Request, Response, NextFunction } from "express";
import z from "zod";
import {prisma} from "@/database/prisma"
import { AppError } from "@/utils/AppError";

class TeamController {
  async create(request: Request, response: Response){
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      description: z.string()
    })

    const {name, description} = bodySchema.parse(request.body)

    const team = await prisma.team.create({
      data: {
        name,
        description
      }
    })

    return response.status(201).json(team)
  }
  async read(request: Request, response: Response){
    const teams = await prisma.team.findMany({
      select:{
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true
      }
    })
    return response.status(200).json(teams)
  }
  async update(request: Request, response: Response){
    return response.status(200).json({message: "To implement"})
  }
  async delete(request: Request, response: Response){
    return response.status(200).json({message: "To implement"})
  }
}

export {TeamController}