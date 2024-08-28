"use server"

import axios from "axios"
import { TaskSchema, TasksSchema } from "../schemas"
import { Task } from "../types"
import { getServerSession } from 'next-auth'


export const getTaskByUser = async()=> {
    try {
        const session = await getServerSession()

        const tasks = await axios(`http://localhost:3000/tasks/api?userEmail=${session?.user?.email}`)
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
        const url = `http://localhost:3000/tasks/searchTask/api?taskId=${taskId}`
        const { data } = await axios(url)
        const response = TaskSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        //console.log(error)
    }
}
