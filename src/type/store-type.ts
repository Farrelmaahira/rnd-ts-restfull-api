import { UserRequest, UserResponse } from "./user-type";

export interface RequestOpenStore {
   name : string,
   description : string,
   address : string,
   user : UserRequest 
}

type store = {
    name : string,
    description : string,
    address : string
}

export interface UserStoreResponse extends UserResponse {
    store : store
}