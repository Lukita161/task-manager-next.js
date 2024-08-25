"use client"

import { PlusIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"


export const FloatingButton = ()=> {
    const router = useRouter()
    return (
        <div className="fixed bottom-5 right-5 shadow-lg bg-terciary rounded-full p-4 hover:cursor-pointer hover:bg-terciary/80 dark:bg-whited dark:hover:bg-whited/80 transition-colors">
            <PlusIcon onClick={()=> router.push('?createModal=true')} className="text-white font-black dark:text-blacked" width={30} height={30} />
        </div>
    )
}