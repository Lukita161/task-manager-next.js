"use client"

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { category } from "@/src/data/category";
import { useFetchTaskById } from "@/src/hooks/useFetchTaskById";

// Podemos sacar la id del task desde la url
export default function ViewTaskModal() {
	const router = useRouter()
	const params = useSearchParams()
	const isActive = params.get('viewTask')
  const taskId = params.get('taskId')!

  const { task, loading } = useFetchTaskById(taskId)

  if(loading) return 'Cargando...'
	const closeModal = ()=> router.push('/')

  return (
    <>
      <Dialog
        open={Boolean(isActive)}
        onClose={closeModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg lg:w-[100vw] space-y-4 border bg-white p-12">
            <DialogTitle className="font-black text-gray-800 text-3xl border-b border-gray-300 uppercase mb-8 text-center">Hola</DialogTitle>
            <Description>

            </Description>
            <form className="flex flex-col gap-2 ">
                    <label className="font-medium text-gray-600" htmlFor="Name">Nombre de la tarea: </label>
                    <input className="w-full mb-6 shadow-sm p-4 border-b rounded bg-gray-100 border-gray-400 outline-none focus:border-b-2 focus:bg-whited/40 transition-colors" type="text" name="Name" placeholder="Nombre tarea" />

                    <label className="font-medium  text-gray-600" htmlFor="Description">Descripción de la tarea: </label>
                    <input className="w-full mb-6 shadow-sm p-4 border-b rounded bg-gray-100 bg-none border-gray-400 outline-none focus:border-b-2 focus:bg-whited/40 transition-colors" type="text" name="Description" placeholder="Descripcion tarea" />

                    <label className="font-medium  text-gray-600" htmlFor="Categoria">Categoria: </label>
                    <select className="w-full shadow-sm p-4 border-b rounded bg-gray-100 bg-none border-gray-400 outline-none focus:border-b-2 focus:bg-whited/40 transition-colors" name="Categoria">
                      {category.map(category => (
                        <option key={category.value} value={category.value}> {category.name} </option>
                      ))}
                    </select>
                    <input className="w-3/6 font-black mx-auto text-center bg-whited rounded-full shadow-md p-2 py-3 mt-4 uppercase text-sm text-gray-800 hover:cursor-pointer hover:bg-[#CEB094] transition-colors" type="submit" value="Crear tarea" />
                </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
