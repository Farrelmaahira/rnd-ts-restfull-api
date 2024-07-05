import { z, ZodType } from "zod"

export class UserValidation {

    static readonly REGISTER : ZodType = z.object({
        email : z.coerce.string().email().min(5),
        username : z.string().min(4),
        password : z.string().min(8)
    })

    static readonly LOGIN : ZodType = z.object({
        email : z.coerce.string().email().min(5),
        password : z.string().min(8)
    })
}


