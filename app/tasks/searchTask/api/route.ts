import connectDb from "@/src/db"
import Task from "@/src/models/Tasks"
import User from "@/src/models/User"
import { NextRequest } from "next/server"


export const GET = async(req: NextRequest)=> {
    await connectDb()
    const searchParams = req.nextUrl.searchParams
    const taskId = searchParams.get('taskId')
    try {
        const authorizationHeader = req.headers;
        if (!authorizationHeader) {
            return Response.json({ error: 'Unauthorized' }, {status: 404});
        }

        const userEmail = authorizationHeader.get('authorization')?.split(' ')[1]
        const userInfo = await User.findOne({email: userEmail}).select('_id').populate('tasks','_id name description completed category','', {_id: taskId})
        if(!userInfo) {
            return Response.json({error: 'El usuario no existe'}, {status: 404})
        }
        
        const [task] = userInfo.tasks
        return Response.json(task)
    } catch (error) {
        return Response.json({error: "No se ha encontrado la tarea"}, {status: 404})
    }
} 