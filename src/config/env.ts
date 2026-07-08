import 'dotenv/config'


export const env = {
    PORT: Number(process.env.PORT),
    JWT_SECRET: process.env.JWT_SECRET!
}