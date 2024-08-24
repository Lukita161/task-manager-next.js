"use server"

import connectDb from "@/src/db"
import Task from "@/src/models/Tasks"
import { CreateTasksFormSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"


export const createTask = async(data: unknown)=> {
    const response = CreateTasksFormSchema.safeParse(data)
    if(!response.success) {
        return {
            errors: response.error.issues
        }
    }
    try {
        await connectDb()
        await Task.create({
            name: response.data.name,
            description: response.data.description,
            category: response.data.category
        })
        revalidatePath('/')
    } catch (error) {
        console.log(error)
        return
    }
}