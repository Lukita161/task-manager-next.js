"use client";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { category } from "@/src/data/category";
import { useFetchTaskById } from "@/src/hooks/useFetchTaskById";
import { EditTask } from "@/actions/edit-task";
import { toast } from "react-toastify";

export default function EditTaskModal() {
  const router = useRouter();
  const params = useSearchParams();
  const isActive = params.get("editTask");
  const taskId = params.get("taskId")!;

	const handleAction = async(formData: FormData)=> {
		const data = {
			name: formData.get('Name'),
			description: formData.get('Description'),
			category: formData.get('Categoria')
		}
		await EditTask(taskId, data)
		toast.success('Actualizada correctamente')
		router.push('/')
	}

  const closeModal = () => router.push("/");

  const { task, loading } = useFetchTaskById(taskId);

  if (loading) return "Cargando...";

  if (task)
    return (
      <>
        <Dialog
          open={Boolean(isActive)}
          onClose={closeModal}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-blacked/50">
            <DialogPanel className="max-w-lg lg:w-[100vw] space-y-4 border bg-white p-12">
              <DialogTitle className="font-black text-gray-800 text-3xl border-b border-gray-300 uppercase mb-8 text-center">
                Editar tarea
              </DialogTitle>
              <Description></Description>
              <form action={handleAction} className="flex flex-col gap-2 ">
                <label className="font-medium text-gray-600" htmlFor="Name">
                  Nombre de la tarea:{" "}
                </label>
                <input
                  defaultValue={task.name}
                  className="w-full mb-6 shadow-sm p-4 border-b rounded bg-gray-100 border-gray-400 outline-none focus:border-b-2 focus:bg-whited/40 transition-colors"
                  type="text"
                  name="Name"
                  placeholder="Nombre tarea"
                />

                <label
                  className="font-medium  text-gray-600"
                  htmlFor="Description"
                >
                  Descripción de la tarea:{" "}
                </label>
                <input
                  defaultValue={task.description}
                  className="w-full mb-6 shadow-sm p-4 border-b rounded bg-gray-100 bg-none border-gray-400 outline-none focus:border-b-2 focus:bg-whited/40 transition-colors"
                  type="Description"
                  name="Description"
                  placeholder="Descripcion tarea"
                />

                <label
                  className="font-medium  text-gray-600"
                  htmlFor="Categoria"
                >
                  Categoria:{" "}
                </label>
                <select
                  defaultValue={task.category}
                  className="w-full shadow-sm p-4 border-b rounded bg-gray-100 bg-none border-gray-400 outline-none focus:border-b-2 focus:bg-whited/40 transition-colors"
                  name="Categoria"
                >
                  {category.map((category) => (
                    <option key={category.value} value={category.value}>
                      {" "}
                      {category.name}{" "}
                    </option>
                  ))}
                </select>
                <input
                  className="w-3/6 font-black mx-auto text-center bg-whited rounded-full shadow-md p-2 py-3 mt-4 uppercase text-sm text-gray-800 hover:cursor-pointer hover:bg-[#CEB094] transition-colors"
                  type="submit"
                  value="Editar tarea"
                />
              </form>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    );
}
