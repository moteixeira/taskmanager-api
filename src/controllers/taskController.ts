import { Request, Response, NextFunction } from "express";
import z from "zod";
import {prisma} from "@/database/prisma"
import { AppError } from "@/utils/AppError";
import { Priority, Status } from "@prisma/client";

class TaskController {
  async create(request: Request, response: Response){
    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      status: z.nativeEnum(Status).default("pending"),
      priority: z.nativeEnum(Priority).default("low"),
      team_id: z.coerce.number().positive(),
      user_id: z.coerce.number().positive(),
    })

      const {title, description, status, priority, user_id, team_id } = bodySchema.parse(request.body)

      const teamExists = await prisma.team.findUnique({
        where : {id: team_id}
      })
      
      if(!teamExists){
        throw new AppError("Team not found", 404)
      }
      
      const userExists = await prisma.user.findUnique({
        where: {id: user_id}
      })

      if(!userExists){
        throw new AppError("User not Found", 404)
      }
      const task = await prisma.task.create({
        data: {
          title,
          description,
          status,
          priority,
          assignedTo: user_id,
          teamId: team_id
        }
      })

      return response.status(201).json(task)
  }
  async read(request: Request, response: Response){
    const tasks = await prisma.task.findMany({
      select: {
        title: true,
        description: true,
        status: true,
        priority: true,
        assignedTo: true,
        teamId: true,
        history: true,
        createdAt: true,
        updatedAt: true
      }
    })
     return response.status(200).json()
  }
  async update(request: Request, response: Response){
     return response.status(200).json()
  }
  async delete(request: Request, response: Response){
     return response.status(200).json()
  }
}

export {TaskController}