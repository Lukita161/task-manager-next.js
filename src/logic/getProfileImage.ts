"use server"

import { getServerSession } from "next-auth"
import connectDb from "../db"
import User from "../models/User"

export const getProfileImage = async()=> {
    const session = await getServerSession()
    const email = session?.user?.email
    try {
        await connectDb()
        if(!email) {
            throw new Error('El usuario no esta autenticado')
        }
        const user = await User.findOne({email}).select('image')
        if(!user) {
            throw new Error('No se ha encontrado el usuario')
        }
        return user.image
    } catch (error) {
        console.log(error)
    }
}