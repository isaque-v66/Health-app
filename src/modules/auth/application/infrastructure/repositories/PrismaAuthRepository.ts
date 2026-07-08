import { Roles, type User } from "@prisma/client";
import type { AuthRepository } from "./AuthRepository.js";
import { prisma } from "../../../../../shared/prisma/client.js";




export class PrismaAuthRepository implements AuthRepository {

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {email}
        })
    }

    async create(data: { name: string; email: string; password: string; }): Promise<User> {
        return prisma.user.create({
            data: {
                ...data,
                role: Roles.PATIENT
            }
        })
    }
}