import { INewUser } from "@/types"
import { createUserAccount } from "../appwrite/api"

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