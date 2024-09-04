"use client";

import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { category } from "@/src/data/category";
import { EditWeekTask } from "@/actions/weekTasks/edit-week-task";
import { toast } from "react-toastify";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { useFetchWeekTaskById } from "@/src/hooks/useFetchWeekTaskById";
import { useEffect, useState } from "react";
import { weekDays } from "@/src/data/weekDays";
import { dayTranslation } from "@/src/utils";

export default function EditWeekTaskModal() {
    const router = useRouter();
    const params = useSearchParams();
    const isActive = params.get("editWeekTask");
    const taskId = params.get("taskId")!;
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const { task, loading, clearTask } = useFetchWeekTaskById(taskId);
    
	const handleAction = async(formData: FormData)=> {
		const data = {
			name: formData.get('Name'), 
			description: formData.get('Description'),
			category: formData.get('Categoria'),
      startTime: startTime,
      endTime: endTime,
      day: formData.get('WeekDay')
		}
		await EditWeekTask(taskId, data)
    clearTask()
		toast.success('Actualizada correctamente')
		router.push('/week')
	}
  const closeModal = () => {
    clearTask()
    router.push("/week")
  };

    const handleStartTime = (e)=> setStartTime(e)
    const handleEndTime = (e)=> setEndTime(e)

    useEffect(() => {
      if (task) {
        setStartTime(task.startTime?.toString() || ""); // Handle potential undefined startTime
        setEndTime(task.endTime?.toString() || ""); // Handle potential undefined endTime
      }
    }, [task])

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
                    <option selected={task.category === category.value && true} key={category.value} value={category.value}>
                      {" "}
                      {category.name}{" "}
                    </option>
                  ))}
                </select>
                <select
                className="w-full shadow-sm p-4 border-b rounded bg-gray-100 bg-none border-gray-400 outline-none focus:border-b-2 focus:bg-whited/40 transition-colors"
                name="WeekDay"
              >
                {weekDays.map((day) => (
                  <option selected={task.day === day.value && true} key={day.value} value={day.value}>
                    {" "}
                    {day.name}{" "}
                  </option>
                ))}
              </select>
                <TimePicker disableClock={true} onChange={handleStartTime}  value={startTime} />
                <TimePicker disableClock={true} onChange={handleEndTime}  value={endTime} />
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
