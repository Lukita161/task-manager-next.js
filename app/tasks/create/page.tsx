"use client"

import { createTask } from "@/actions/create-task";
import { GoBackButton } from "@/src/components/GoBackButton";
import { ToastNotification } from "@/src/components/UI/ToastNotification";
import { CreateTasksFormSchema } from "@/src/schemas";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { toast } from "react-toastify";




export default function CreateTaskPage() {
    const router = useRouter()
    const handleAction = async(formData: FormData)=> {
        const data = {
            name: formData.get('Name'),
            description: formData.get('Description')
        }
        const response = CreateTasksFormSchema.safeParse(data)
        console.log(response)
        if(!response.success) {
            response.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        const result = await createTask(response.data)
        if(result?.errors) {
            result.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        toast.success('Tarea creada correctamente')
        router.push('/')
    }
    

    return (
        <Suspense fallback={'Cargando...'}>
            <section className="flex w-[40vw] md:w-[90vw] h-screen items-center justify-center">
                <div className="w-7/12 h-90vh md:h-2/3 shadow-2xl rounded-md p-6 bg-[#6b818c]/30">
                <GoBackButton />
                <form action={handleAction} className="flex flex-col space-y-5 my-auto">
                    <label htmlFor="Name">Nombre de la tarea: </label>
                    <input className="w-full p-4 border-b rounded bg-white/30 border-gray-400 outline-none focus:border-b-2 focus:bg-white/75 transition-colors" type="text" name="Name" placeholder="Nombre tarea" />

                    <label htmlFor="Description">Descripción de la tarea: </label>
                    <input className="w-full p-4 border-b rounded bg-white/30 bg-none border-gray-400 outline-none focus:border-b-2 focus:bg-white/75 transition-colors" type="text" name="Description" placeholder="Descripcion tarea" />
                    <input type="submit" value="Crear tarea" />
                </form>
                </div>
            </section>
        </Suspense>
    )
}