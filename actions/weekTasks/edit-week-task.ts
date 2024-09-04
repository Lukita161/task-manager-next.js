"use server"

import connectDb from "@/src/db";
import WeekTask from "@/src/models/WeekTasks";
import { CreateWeekTaskFormSchema } from "@/src/schemas";
import { Task as TaskType } from "@/src/types";
import { revalidatePath } from "next/cache";

export const EditWeekTask = async(id: TaskType['_id'], data: unknown)=> {
    await connectDb()
    try {
        const task = await WeekTask.findById(id)
        if(!task) {
            const error = new Error('La tarea no existe')
            return error
        }
        const response = CreateWeekTaskFormSchema.safeParse(data)
        if(!response.success) {
            return {
                errors: response.error.issues
            }
        }
        task.name = response.data.name
        task.description = response.data.description
        task.category = response.data.category
        task.day = response.data.day
        task.startTime = response.data.startTime
        task.endTime = response.data.endTime
        await task.save()
        revalidatePath('/week')
    } catch (error) {
        console.log(error)
    }
}