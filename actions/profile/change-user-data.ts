"use server"

import connectDb from "@/src/db"
import User from "@/src/models/User"
import { ChangeUserSchema } from "@/src/schemas"
import { UserType } from "@/src/types"

export const ChangeUserData = async(data: unknown, email: UserType['email'])=> {
    try {
        await connectDb()
        const user = await User.findOne({email: email})
        if(!user) {
            const error = new Error('Usuario no encontrado')
            return error
        }
        const response = ChangeUserSchema.safeParse(data)
        if(!response.success) {
            return {
                errors: response.error.issues
            }
        }
        user.email = response.data.email
        user.name = response.data.name
        await user.save()
    } catch (error) {
        console.error(error)
    }
}