"use client"

import { useRouter } from "next/navigation"

export const CreateNewWeekTaskButton = ()=> {
    const router = useRouter()
    return (
        <p className="cursor-pointer" onClick={()=> router.push('?createWeekTask=true')}>Ops, parece que todavia no empezaste a organizar tu semana, haz click aqui para crear tareas</p>
    )
}