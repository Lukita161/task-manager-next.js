import connectDb from "@/src/db"
import User from "@/src/models/User";
import WeekTask from "@/src/models/WeekTasks";

export const GET = async(req: Request)=> {
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
        const data = await WeekTask.find({createdBy: userInfo._id}).select('_id name description category completed day')
        return Response.json(data)
    } catch (error) {
        return Response.json({error: 'Algo ha fallada'}, {status: 500})
    }
}