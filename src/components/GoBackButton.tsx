"use client"

import { useRouter } from "next/navigation"

export const GoBackButton = ()=> {
    const router = useRouter()
    return (
        <button onClick={()=>router.push('/')} className="p-4 bg-secundary/80 font-black uppercase text-sm rounded-md text-white">Volver</button>
    )
}