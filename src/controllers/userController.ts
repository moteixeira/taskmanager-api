import { Request, Response, NextFunction } from "express";
import z from "zod";
import { env } from "@/env";
import { hash } from "bcrypt";
import {prisma} from "@/database/prisma"
import { AppError } from "@/utils/AppError";
import { UserRole } from "@prisma/client";

class UserController {
  async create(request: Request, response: Response){
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.string().email(),
      password: z.string().min(6),
      role: z.nativeEnum(UserRole).default("member")
    })

    const {name, email, password, role} = bodySchema.parse(request.body)

    const userWithSameEmail = await prisma.user.findFirst({ where: {email}})

    if(userWithSameEmail){
      throw new AppError("User with same email already exists")
    }

    const hashedPassword = await hash(password, env.SALT)
    
    const user = await prisma.user.create({data: {name, email, role ,password: hashedPassword}})

    const {password: _, ...userWithoutPassword} = user

    return response.status(201).json(userWithoutPassword)
  }
  async read(request: Request, response: Response){
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        role: true,
        team_member: true,
        tasks: true,
        changes: true,
        createdAt: true,
        updatedAt: true
      }
    })
    return response.status(200).json(users)
  }
  async update(request: Request, response: Response){
    return response.status(200).json()
  }
  async delete(request: Request, response: Response){
    return response.status(200).json()
  }
}

export {UserController}