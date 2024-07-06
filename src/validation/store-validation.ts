import {z, ZodType} from "zod";

export class StoreValidation {
    static readonly request : ZodType = z.object({
        name : z.string(),
        description : z.string(),
        address : z.string()
    }) 
}