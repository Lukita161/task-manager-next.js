"use server"

import connectDb from "@/src/db";
import Task from "@/src/models/Tasks";
import { Task as TaskType } from "@/src/types";
import { revalidatePath } from "next/cache";

export const deleteTask = async(id: TaskType['_id']) => {
    await connectDb()
    try {
        const task = await Task.findById(id)
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