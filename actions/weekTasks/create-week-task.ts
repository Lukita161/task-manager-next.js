"use server"

import connectDb from "@/src/db"
import User from "@/src/models/User"
import { WeekDay } from "@/src/models/WeekDays"
import WeekTask from "@/src/models/WeekTasks"
import { CreateWeekTaskFormSchema } from "@/src/schemas"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const createWeekTask = async(data: unknown)=> {
    const serverSession = await getServerSession()

    await connectDb()
    try {
        const response = CreateWeekTaskFormSchema.safeParse(data)
        if(!response.success) {
            return {
                errors: response.error.issues
            }
        }
        const user = await User.findOne({email: serverSession?.user?.email}).select('_id')
        const newTask = await WeekTask.create({
            name: response.data.name,
            description: response.data.description,
            category: response.data.category,
            day: response.data.day,
            startTime: response.data.startTime,
            endTime: response.data.endTime,
            createdBy: user._id
        })
        const day = await WeekDay.findOne({day: newTask.day})
        day.tasks.push(newTask._id)
        day.save()
        revalidatePath("/week")
    } catch (error) {
        console.log(error)
    }
}