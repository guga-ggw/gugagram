import { INewUser } from "@/types"
import { createUserAccount, signInAccount } from "../appwrite/api"

import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from "@tanstack/react-query"

export const usecreateNewUserMutation = () => {
    return useMutation({
        mutationFn : (user:INewUser) => createUserAccount(user)
    })
}

export const useSignUpMutation = () => {
    return useMutation({
        mutationFn : (user : {email : string, password : string}) => signInAccount(user)
    })
}