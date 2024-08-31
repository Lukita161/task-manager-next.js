"use server"

import connectDb from "@/src/db"
import DailyTask from "@/src/models/DailyTasks"
import User from "@/src/models/User"
import { CreateTasksFormSchema } from "@/src/schemas"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"


export const createTask = async(data: unknown)=> {
    const serverSession = await getServerSession()
    const response = CreateTasksFormSchema.safeParse(data)
    if(!response.success) {
        return {
            errors: response.error.issues
        }
    }
    try {
        await connectDb()
        const user = await User.findOne({email: serverSession?.user?.email})
        if(!user) {
            throw new Error('Algo esta mal')
        }
        const task = await DailyTask.create({
            name: response.data.name,
            description: response.data.description,
            category: response.data.category,
            createdBy: user._id
        })
        await user.tasks.push(task._id)
        await user.save()
        revalidatePath('/')
    } catch (error) {
        console.log(error)
        return
    }
}