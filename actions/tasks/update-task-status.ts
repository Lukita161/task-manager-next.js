"use server"

import connectDb from "@/src/db"
import DailyTask from "@/src/models/DailyTasks"
import { revalidatePath } from "next/cache"


export const updateStatus = async(taskId: string)=> {
    try {
        await connectDb()
        const task = await DailyTask.findById(taskId)
        task.completed = !task.completed
        task.save()
        revalidatePath('/')
    } catch (error) {
        console.log(error)
        return
    }
}