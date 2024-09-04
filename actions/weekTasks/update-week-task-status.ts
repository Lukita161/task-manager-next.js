"use server"

import connectDb from "@/src/db"
import DailyTask from "@/src/models/DailyTasks"
import WeekTask from "@/src/models/WeekTasks"
import { revalidatePath } from "next/cache"


export const updateWeekTaskStatus = async(taskId: string)=> {
    try {
        await connectDb()
        const task = await WeekTask.findById(taskId)
        task.completed = !task.completed
        task.save()
        revalidatePath(`/week`)
    } catch (error) {
        console.log(error)
        return
    }
}