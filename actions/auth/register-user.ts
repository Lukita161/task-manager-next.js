"use server"

import bcrypt from "bcrypt"
import connectDb from "@/src/db"
import User from "@/src/models/User"
import { RegisterUserSchema } from "@/src/schemas"
import { genereteRandomToken } from "@/src/utils"

export const registerUser = async(data:unknown)=> {
    try {
        await connectDb()
        const result = RegisterUserSchema.safeParse(data)
        if(!result.success) {
            return {
                errors: result.error.issues
            }
        }
        const token = genereteRandomToken()
        await User.create({
            name: result.data.name,
            email: result.data.email,
            password: await bcrypt.hash(result.data.password, 10),
            token
        })
    } catch (error) {
        return
    }
}