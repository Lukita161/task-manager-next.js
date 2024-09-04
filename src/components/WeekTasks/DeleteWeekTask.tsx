"use client"

import { deleteTask } from "@/actions/tasks/delete-task";
import { deleteWeekTask } from "@/actions/weekTasks/delete-week-task";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

// En base a los params llamamos a nuestra DB
export default function DeleteWeekTaskModal() {
	const router = useRouter()
	const params = useSearchParams()
	const isActive = params.get('deleteWeekTask')
    const taskId = params.get('taskId')!

    const handleAction = async()=> {
        await deleteWeekTask(taskId)
        toast.success('Eliminada correctamente')
        router.push('/week')
    }
	const closeModal = ()=> router.push('/week')

return (
      <Dialog
        open={Boolean(isActive)}
        onClose={closeModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg lg:w-[100vw] space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold text-red-500 text-3xl border-b border-gray-300 uppercase mb-8 text-center"> <h1>Eliminar tarea</h1> </DialogTitle>
            <Description>
              <div>
                <span className="text-gray-800 font-bold">Estas seguro que quieres eliminar esta tarea: </span>
              </div>
              <div className="w-full flex items-center justify-center mt-6">
                <div className="p-2 w-2/6 rounded-lg text-center text-white font-black bg-red-500 hover:bg-red-600 transition-colors">
                <form action={handleAction}>
                  <input type='submit' value='Eliminar' />
                </form>
                </div>
              </div>

            </Description>
          </DialogPanel>
        </div>
      </Dialog>
  );
}