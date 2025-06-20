"use server"

import { ID, Query } from "node-appwrite";
import { users } from "@/lib/appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
    try {
        console.log('Project ID:', process.env.NEXT_PUBLIC_PROJECT_ID);
        console.log('Endpoint:', process.env.NEXT_PUBLIC_ENDPOINT);
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined, // password is not required
            user.name,
        )
        return parseStringify(newUser);
    } catch (error: any) {
        if(error && error?.code === 409) {
            const documents = await users.list([
                Query.equal('email', user.email),
            ])
            return documents?.users[0];
        }
        console.log("An error occurred while a new user:", error);
    }
}