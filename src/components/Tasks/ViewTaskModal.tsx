"use client"

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchTaskById } from "@/src/hooks/useFetchTaskById";
import { translateCategory } from "@/src/data/category";

// En base a los params llamamos a nuestra DB
export default function ViewTaskModal() {
	const router = useRouter()
	const params = useSearchParams()
	const isActive = params.get('viewTask')
  const taskId = params.get('taskId')!

  const { task, loading } = useFetchTaskById(taskId)

  if(loading) return 'Cargando...'
	const closeModal = ()=> router.push('/')

  if(task) return (
    <>
      <Dialog
        open={Boolean(isActive)}
        onClose={closeModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg lg:w-[100vw] space-y-4 border bg-white p-12">
            <DialogTitle className="font-black text-gray-800 text-2xl border-b border-gray-300 uppercase mb-8 text-center"> <h1>{ task.name }</h1> </DialogTitle>
            <Description>
              <div>
                <h3 className="text-gray-700 font-medium">Descripcion: <span className="text-gray-800 font-bold">{task.description}</span> </h3>
                <h4>Categoria: <span>{ translateCategory(task.category) }</span></h4>
              </div>
            </Description>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
