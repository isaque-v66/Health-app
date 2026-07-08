import { AppError } from "../../../../shared/errors/AppError.js";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import type { AuthRepository } from "../infrastructure/repositories/AuthRepository.js";
import { RegisterDTOSchema, type RegisterDTOType } from "../dto/RegisterDTO.js";


export class RegisterUseCase {
   constructor (private repository: AuthRepository){}


   async execute(data: RegisterDTOType){
     RegisterDTOSchema.parse(data)

     const userAlreadyExists = await this.repository.findByEmail(data.email)

     if(userAlreadyExists) {
        throw new AppError("User Already Exists", 409)
     }

     const hashPassword = await bcrypt.hash(data.password, 10)


     const user = await this.repository.create({
        ...data,
        password: hashPassword
     })



     const token = jwt.sign(
        {
            sub: user.id,
            role: user.role
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1d"
        }
    )


    return {
        token,
        user
    }

   }
}