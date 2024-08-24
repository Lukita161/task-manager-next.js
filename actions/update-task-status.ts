"use server"

import connectDb from "@/src/db"
import Task from "@/src/models/Tasks"
import { revalidatePath } from "next/cache"


export const updateStatus = async(taskId: string)=> {
    try {
        await connectDb()
        const task = await Task.findById(taskId)
        task.completed = !task.completed
        task.save()
        revalidatePath('/')
    } catch (error) {
        console.log(error)
        return
    }
}