import connectDb from "@/src/db";
import User from "@/src/models/User";
import WeekTask from "@/src/models/WeekTasks";
import { NextRequest } from "next/server";

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
        const userInfo = await User.findOne({email: userEmail}).select('_id')
        if(!userInfo) {
            return Response.json({error: 'El usuario no existe'}, {status: 404})
        }
        const data = await WeekTask.find({createdBy: userInfo._id, _id: taskId}).select('_id name description category completed day startTime endTime')
        const task = data[0]
        return Response.json(task)
    } catch (error) {
        return Response.json({error: "No se ha encontrado la tarea"}, {status: 404})
    }
}