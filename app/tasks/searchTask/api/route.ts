import connectDb from "@/src/db"
import Task from "@/src/models/Tasks"
import { NextRequest } from "next/server"


export const GET = async(req: NextRequest)=> {
    await connectDb()
    const searchParams = req.nextUrl.searchParams
    const taskId = searchParams.get('taskId')
    try {
        const data = await Task.findById(taskId)
        if(!data) {
            return Response.json({error: "No se ha encontrado la tarea"}, {status: 404})
        }
        return Response.json(data)
    } catch (error) {
        console.log(error)
    }
} 