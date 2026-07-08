import z from "zod";


export const RegisterDTOSchema = z.object({
    name: z.string(),
    email: z.email('E-mail invalid'),
    password: z.string().min(5)
})


export type RegisterDTOType = z.infer<typeof RegisterDTOSchema>