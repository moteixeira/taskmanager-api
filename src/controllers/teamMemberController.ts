import { Request, Response, NextFunction } from "express";
import z from "zod";
import { env } from "@/env";
import {prisma} from "@/database/prisma"
import { AppError } from "@/utils/AppError";

class TeamMemberController {
  async create(request: Request, response: Response){
    const paramsSchema = z.object({
      team_id: z.coerce.number().int().positive()
    })

    const bodySchema = z.object({
      user_id: z.coerce.number().int().positive()
    })
    
    const {team_id} = paramsSchema.parse(request.params)
    const {user_id} = bodySchema.parse(request.body)

    const team = await prisma.team.findUnique({
      where : {id: team_id}
    })
    
    if(!team){
      throw new AppError("Team not found", 404)
    }
    
    const user = await prisma.user.findUnique({
      where: {id: user_id}
    })

    if(!user){
      throw new AppError("User not Found", 404)
    }
    
    const teamMembership = await prisma.teamMember.create({
      data:{
        userId: user_id,
        teamId: team_id
      }
    })

    return response.status(200).json()
  }
  async delete(request: Request, response: Response){
    const paramsSchema = z.object({
      team_id: z.coerce.number().int().positive()
    })

    const bodySchema = z.object({
      user_id: z.coerce.number().int().positive()
    })
    
    const {team_id} = paramsSchema.parse(request.params)
    const {user_id} = bodySchema.parse(request.body)

    const team = await prisma.team.findUnique({
      where : {id: team_id}
    })
    
    if(!team){
      throw new AppError("Team not found", 404)
    }
    
    const user = await prisma.user.findUnique({
      where: {id: user_id}
    })

    if(!user){
      throw new AppError("User not Found", 404)
    }
    
    const teamMembership = await prisma.teamMember.deleteMany({
      where:{
        userId: user_id,
        teamId: team_id
      }
    })

    if(teamMembership.count === 0){
      throw new AppError("Membership not found",404)
    }

    return response.status(204).json()
  }
}

export {TeamMemberController}