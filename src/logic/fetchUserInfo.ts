"use server"

import { getServerSession } from "next-auth";
import connectDb from "../db";
import User from "../models/User";
import { UserSchema } from "../schemas";
import { UserType } from "../types";

export const getUserInfo = async() => {
    try {
        await connectDb()
        const session = await getServerSession()
        const email = session?.user?.email
        const userInfo = await User.findOne({email: email}).select('email name')
        if(!userInfo) {
            const error = new Error('El usuario no existe')
            return error
        }
        const response = UserSchema.safeParse(userInfo)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        console.error(error)
    }
}