"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import connectDb from "@/src/db"
import Task from "@/src/models/Tasks"
import User from "@/src/models/User"
import { getServerSession } from "next-auth"
import { NextRequest } from "next/server"

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

export const GET = async(req: NextRequest)=> {
    await connectDb()
    try {
        const authorizationHeader = req.headers;
        if (!authorizationHeader) {
            return Response.json({ error: 'Unauthorized' }, {status: 404});
        }

        const userEmail = authorizationHeader.get('authorization')?.split(' ')[1]
        const userInfo = await User.findOne({email: userEmail})
        if (!userInfo) {
            return new Response('User not found', { status: 404 });
          }
        const data = await Task.find({createdBy: userInfo._id}).select('_id name description completed category')
        return Response.json(data)
    } catch (error) {
        return Response.json({message: 'Error'}, {status: 404})
    }
}