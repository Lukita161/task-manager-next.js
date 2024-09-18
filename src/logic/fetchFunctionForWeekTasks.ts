"use server"

import axios, { isAxiosError } from "axios"
import { getServerSession } from "next-auth"
import { WeekTaskSchema, WeekTasksSchema } from "../schemas"
import { Task } from "../types"

export const getWeekTasks = async()=> {
    try {
        const session = await getServerSession()
        const email = session?.user?.email
        if(!session) {
            throw new Error('Acceso no autorizado')
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${email}`
            }
        }
        const {data} = await axios(`${process.env.FRONTEND_URL}/week/api`, config)
        const response = WeekTasksSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export const getWeekTaskById = async(taskId: Task['_id']) => {
    try {
        const session = await getServerSession()
        const email = session?.user?.email
        if(!session) {
            throw new Error('Acceso no autorizado')
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${email}`
            }
        }
        const url = `${process.env.FRONTEND_URL}/week/searchWeekTask/api?taskId=${taskId}`
        const { data } = await axios(url, config)
        const result = WeekTaskSchema.safeParse(data)
        if(result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error)
    }
}