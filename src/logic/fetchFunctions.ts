"use server"

import axios from "axios"
import { TaskSchema, TasksSchema } from "../schemas"
import { Task } from "../types"
import { getServerSession } from 'next-auth'
import { WeekDay } from "../models/WeekDays"


export const getTaskByUser = async()=> {
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
        const tasks = await axios(`http://localhost:3000/tasks/api`, config)
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
        const url = `http://localhost:3000/tasks/searchTask/api?taskId=${taskId}`
        const { data } = await axios(url, config)
        const response = TaskSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export async function createWeekdays() {
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
    try {
      await WeekDay.deleteMany({}); // Delete existing weekdays (if any)
      await WeekDay.insertMany(weekdays.map(day => ({ day })));
      console.log('Weekdays created successfully!');
    } catch (error) {
      console.error('Error creating weekdays:', error);
    }
  }
  
  // Call the function to create weekdays
  createWeekdays();