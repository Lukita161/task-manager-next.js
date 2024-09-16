"use server"

import connectDb from "@/src/db"
import User from "@/src/models/User"
import { RegisterUserSchema } from "@/src/schemas"
import { generateRandomToken } from "@/src/utils"
import { hashPassword } from "@/src/logic/password"
import { sendMail } from "@/src/lib/Nodemailer"

export const registerUser = async(data:unknown)=> {
    try {
        await connectDb()
        const result = RegisterUserSchema.safeParse(data)
        if(!result.success) {
            return {
                errors: result.error.issues
            }
        }
        const token = generateRandomToken()
        const hashedPassword = await hashPassword(result.data.password)
        await User.create({
            name: result.data.name,
            email: result.data.email,
            password: hashedPassword,
            token
        })
        await sendMail({
            name: result.data.name,
            email: result.data.email
        }, token)
    } catch (error) {
        return
    }
}