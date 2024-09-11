"use server"

import bcrypt from 'bcrypt'
import connectDb from "@/src/db"
import User from "@/src/models/User"
import { ChangePasswordSchema } from "@/src/schemas"
import { UserType } from "@/src/types"
import { hashPassword } from '@/src/logic/password'

export const ChangePasswordAction = async(data: unknown, email: UserType['email'])=> {
    try {
        await connectDb()
        const user = await User.findOne({email})
        if(!user) {
            const error = new Error('El usuario no se ha encontrado')
            return {
                errors: error
            }
        }
        const result = ChangePasswordSchema.safeParse(data)
        if(!result.success) {
            const error = new Error('Las contraseñas no son validas')
            return {
                error
            }
        }
        const isValidPassword = await bcrypt.compare(result.data.currentPassword, user.password) 
        if(!isValidPassword) {
            const error = new Error('La contraseña actual no es correcta')
            return error
        }
        const hashedPassword = await hashPassword(result.data.newPassword)
        user.password = hashedPassword
        await user.save()
    } catch (error) {
        console.log(error)
    }
}