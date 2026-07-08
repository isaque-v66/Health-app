import type { User } from "@prisma/client";


export interface AuthRepository {

    
    findByEmail(email: string): Promise<User | null>

    create(data: {
        name: string,
        email: string,
        password: string
    }): Promise<User>
}