"use server"

import connectDb from "@/src/db";
import DailyTask from "@/src/models/DailyTasks";
import User from "@/src/models/User";
import { Task as TaskType } from "@/src/types";
import { revalidatePath } from "next/cache";

export const deleteTask = async(id: TaskType['_id']) => {
    await connectDb()
    try {
        const task = await DailyTask.findById(id)
        if(!task) {
            const error = new Error('La tarea no existe')
            return error
        }
        const user =  await User.findOne({_id: task.createdBy}).select('_id').populate('tasks','_id')
        console.log(user)
        user.tasks = await user.tasks.filter((taskId) => task._id.toString() !== taskId.id.toString())
        await user.save()
        await task.deleteOne()
        revalidatePath('/')
    } catch (error) {
        console.log(error)
    }
}