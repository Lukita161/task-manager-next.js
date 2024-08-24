"use server"

import connectDb from "@/src/db"
import Task from "@/src/models/Tasks"
import { CreateTasksFormSchema } from "@/src/schemas"


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
            description: response.data.description
        })
    } catch (error) {
        console.log(error)
        return
    }
}