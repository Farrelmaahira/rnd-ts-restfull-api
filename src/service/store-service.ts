import { RequestOpenStore, UserStoreResponse } from "../type/store-type";
import { Validation } from "../validation/validation";
import {StoreValidation} from "../validation/store-validation";
import { prisma } from "../application/db"
import { ResponseError } from "../error/response-error";
import { UserResponse } from "../type/user-type";

export class StoreService {

    static async requestOpenStore(payload: RequestOpenStore): Promise<UserStoreResponse>{
        const requestData = Validation.validate(StoreValidation.request, payload);
        const user = prisma.user
        const checkUser = await user.findFirst({
            where : {
                email : payload.user.email
            }
        })

        if(checkUser?.status === 'pending' || checkUser?.status === 'seller') {
            throw new ResponseError('Cannot request to open store', 400);
        }

        const updateUser: UserResponse = await user.update({
            where : {
                email : payload.user.email
            },
            data : {
                status : 'pending',
            }
        }) as UserResponse
        
        const store = await prisma.store.create({
            data : {
                name: requestData.name,
                description: requestData.description,
                address: requestData.address,
                userId: updateUser.id
            }
        })

        const response: UserStoreResponse = {
            ...updateUser,
            store : store
        }

        return response
    }
}