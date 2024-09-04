"use server"

import connectDb from "@/src/db"
import WeekTask from "@/src/models/WeekTasks"
import { WeekTask as WeekTaskType } from "@/src/types"
import { revalidatePath } from "next/cache"

export const deleteWeekTask = async(id: WeekTaskType['_id']) => {
    await connectDb()
    try {
        const task = await WeekTask.findById(id)
        if(!task) {
            const error = new Error('La tarea no existe')
            return error
        }
        await task.deleteOne()
        revalidatePath('/')
    } catch (error) {
        console.log(error)
    }
}