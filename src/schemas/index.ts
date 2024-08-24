import { z } from "zod";

export const CreateTasksFormSchema = z.object({
    name: z.string().min(1, 'El nombre no puede estar vacio'),
    description: z.string().min(1, {message: 'La descripcion no puede ir vacia'})
})

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    completed: z.boolean()
})

export const TasksSchema = z.array(TaskSchema)