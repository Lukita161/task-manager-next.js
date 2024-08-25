"use client"

import { useRouter } from "next/navigation"

export const CreateTaskButton = ()=> {

    const router = useRouter()
    const handleClick = ()=> {
      router.push('tasks/create')
    }
  
    return (
        <button onClick={handleClick} className="p-4 bg-secundary/80 font-black uppercase text-sm rounded-md text-white dark:text-blacked dark:bg-whited">Agregar Tarea</button>
    )
}