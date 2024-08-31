"use server"

import connectDb from "@/src/db";
import DailyTask from "@/src/models/DailyTasks";
import { CreateTasksFormSchema } from "@/src/schemas";
import { Task as TaskType } from "@/src/types";
import { revalidatePath } from "next/cache";

export const EditTask = async(id: TaskType['_id'], data: unknown)=> {
    await connectDb()
    try {
        const task = await DailyTask.findById(id)
        if(!task) {
            const error = new Error('La tarea no existe')
            return error
        }
        const response = CreateTasksFormSchema.safeParse(data)
        if(!response.success) {
            return {
                errors: response.error.issues
            }
        }
        task.name = response.data.name
        task.description = response.data.description
        task.category = response.data.category
        await task.save()
        revalidatePath('/')
    } catch (error) {
        console.log(error)
    }
}