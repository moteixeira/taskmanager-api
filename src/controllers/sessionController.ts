import { Request, Response, NextFunction } from "express";
import z from "zod";
import { env } from "@/env";
import { Secret, sign, SignOptions } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import {prisma} from "@/database/prisma"
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";

class SessionController {
  async create(request: Request, response: Response){
    const bodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {email, password} = bodySchema.parse(request.body)

    const user = await prisma.user.findFirst({
        where: {email}
    })

    if(!user){
        throw new AppError("Invalid Email or Password", 401)
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched){
        throw new AppError("Invalid Email or Password", 401)
    }

    const {secret, expiresIn } = authConfig.jwt

    const options: SignOptions ={
        subject: user.id.toString(),
        expiresIn
    }

    const token = sign({role: user.role ?? "member"}, secret as Secret, options)

    const {password: hashedPassword, ...userWithoutPassword} = user

    return response.json({token , user: userWithoutPassword})
  }
}

export {SessionController}