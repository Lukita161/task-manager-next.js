import axios from "axios"
import { getServerSession } from "next-auth"
import { WeekTasksSchema } from "../schemas"

export const getWeekTasks = async()=> {
    try {
        const session = await getServerSession()
        const email = session?.user?.email
        if(!session) {
            throw new Error('Acceso no autorizado')
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${email}`
            }
        }
        const { data } = await axios(`http://localhost:3000/week/api`, config)
        const response = WeekTasksSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}