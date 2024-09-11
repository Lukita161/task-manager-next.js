import { z } from "zod"
import { TaskSchema, WeekTaskSchema, WeekTasksSchema } from "../schemas"

export type CredetialsUserType = {
    email: string,
    password: string
}

export type UserType = {
    email: string,
    name: string
}

export type Task = z.infer<typeof TaskSchema>

export type WeekTask = z.infer<typeof WeekTaskSchema>
export type WeekTasks = z.infer<typeof WeekTasksSchema>