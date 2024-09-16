"use server"

import bcrypt from 'bcrypt'
import connectDb from "@/src/db"
import User from "@/src/models/User"
import { ChangePasswordSchema } from "@/src/schemas"
import { UserType } from "@/src/types"
import { hashPassword } from '@/src/logic/password'
import { redirect } from 'next/navigation'

export const ChangePasswordAction = async(data: unknown, email: UserType['email'])=> {
    try {
        await connectDb()
        const user = await User.findOne({email})
        if(!user) {
            throw new Error('El usuario no se encontro')
        }
        const result = ChangePasswordSchema.safeParse(data)
        if(!result.success) {
            throw new Error('Revisa los campos, son obligatorios')
        }
        const isValidPassword = await bcrypt.compare(result.data.currentPassword, user.password)
        if(isValidPassword === false) {
            throw new Error('La contraseña actual no es correcta')
        }
        const hashedPassword = await hashPassword(result.data.newPassword)
        user.password = hashedPassword
        await user.save()
        return {result: true}
    } catch (error) {
        console.log(error)
        throw error
    }
}