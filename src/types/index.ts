import { z } from "zod"
import { TaskSchema } from "../schemas"

export type CredetialsUserType = {
    email: string,
    password: string
}

export type Task = z.infer<typeof TaskSchema>