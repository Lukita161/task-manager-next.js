
import connectDb from "@/src/db"
import Task from "@/src/models/Tasks"

export const POST = async(req: Request)=> {
    await connectDb()
    try {
        const { name, description } = await req.json()
        const data = { name, description }
        await Task.create(data)
        return Response.json({message: 'Creada correctamente'})
    } catch (error) {
        return Response.json({message: 'Error'}, {status: 404})
    }
}

export const GET = async()=> {
    await connectDb()
    try {
        const data = await Task.find()
        return Response.json(data)
    } catch (error) {
        console.log(error)
    }
}