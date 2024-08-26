import { z } from "zod";

export const RegisterUserSchema = z.object({
    name: z.string().min(1, {message: 'El nombre es obligatorio'}),
    email: z.string().email({message: 'El email es obligatorio'}),
    password: z.string().min(8, {message: 'La contraseña es obligatoria'})
})

export const CreateTasksFormSchema = z.object({
    name: z.string().min(1, 'El nombre no puede estar vacio'),
    description: z.string().min(1, {message: 'La descripcion no puede ir vacia'}),
    category: z.string().toLowerCase()
})

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    completed: z.boolean(),
    category: z.string()
})

export const TasksSchema = z.array(TaskSchema)