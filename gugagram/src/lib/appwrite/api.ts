import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";


export async function createUserAccount(user : INewUser){
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.username
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDb({
            accountID : newAccount.$id,
            name : newAccount.name,
            email : newAccount.email,
            imageURL : avatarUrl,
            userName : user.username
        })

        return newUser
    } catch (error) {
        console.log(error)
    }
}

export async function saveUserToDb( user :{
    accountID : string,
    email : string,
    name : string,
    imageURL : URL,
    userName : string
}){
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )

        console.log(newUser)
        return newUser
    } catch (error) {
        console.log(error)
    }
}

export async function signInAccount(user : {
    email : string,
    password : string
}){
    try {
        const session = await account.createEmailSession(user.email, user.email)

        return session
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentAccount(){
    try {
        const currentAccount = await account.get()
        if(!currentAccount) throw Error

        const currentUSer = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountID', currentAccount.$id)]
        )

        if(!currentUSer) throw Error

        console.log(currentUSer)
        return currentUSer.documents[0]
    } catch (error) {
        console.log(error)
    }
}