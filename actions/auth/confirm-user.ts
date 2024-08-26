import connectDb from "@/src/db"
import User from "@/src/models/User"

export const confirmUser = async(token: string)=> {
    await connectDb()
    try {
        const user = await User.findOne({token})
        if(!user) {
            const error = new Error('Token no valido')
        }
        user.confirmed = true
        user.token = ''
        await user.save()
    } catch (error) {
        console.log(error)
    }
}