

import axios from "axios"
import { TaskSchema, TasksSchema } from "../schemas"
import { Task } from "../types"

export const GetAllTasks = async()=> {
    try {
        const tasks = await axios('http://localhost:3000/tasks/api')
        const response = TasksSchema.safeParse(tasks.data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const getTaskbyId = async(taskId: Task['_id'])=> {
    try {
        const task = await axios(`http://localhost:3000/tasks/${taskId}/api`)
        const response = TaskSchema.safeParse(task)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}