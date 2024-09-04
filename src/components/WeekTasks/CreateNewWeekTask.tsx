"use client";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { category } from "@/src/data/category";
import { weekDays } from "@/src/data/weekDays";
import { createWeekTask } from "@/actions/weekTasks/create-week-task";
import { toast } from "react-toastify";
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { useState } from "react";

export default function CreateNewWeekTask() {
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const router = useRouter();
  const params = useSearchParams();
  const isActive = params.get("createWeekTask");

  const closeModal = () => router.push("/week");
  const handleAction = async (formData: FormData) => {
    const data = {
      name: formData.get("Name"),
      description: formData.get("Description"),
      category: formData.get("Categoria"),
      day: formData.get("WeekDay"),
      startTime: startTime,
      endTime: endTime
    };
    const response = await createWeekTask(data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    toast.success("Tarea creada correctamente");
    redirect("/week");
  };
  const onChangeStartTime = (e)=> {
    setStartTime(e)
  }
  const onChangeEndTime = (e) => {
    setEndTime(e)
  }

  return (
    <>
      <Dialog
        open={Boolean(isActive)}
        onClose={closeModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen overflow-y-auto items-center justify-center p-3 bg-blacked/50">
          <DialogPanel className="max-w-lg lg:w-[100vw] space-y-3 border rounded-xl bg-white p-12">
            <DialogTitle className="font-black text-gray-800 text-3xl border-b border-gray-300 uppercase mb-8 text-center">
              Nueva tarea
            </DialogTitle>
            <Description></Description>
            <form action={handleAction} className="flex flex-col gap-2">
              <label className="font-medium text-gray-600" htmlFor="Name">
                Nombre de la tarea:{" "}
              </label>
              <input
                className="w-full mb-4 shadow-sm p-4 border-b rounded bg-gray-100 border-gray-400 outline-none focus:border-b-2 focus:bg-whited/40 transition-colors"
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
                className="w-full mb-4 shadow-sm p-4 border-b rounded bg-gray-100 bg-none border-gray-400 outline-none focus:border-b-2 focus:bg-whited/40 transition-colors"
                type="Description"
                name="Description"
                placeholder="Descripcion tarea"
              />

              <label className="font-medium  text-gray-600" htmlFor="Categoria">
                Categoria:{" "}
              </label>
              <select
                className="w-full mb-4 shadow-sm p-4 border-b rounded bg-gray-100 bg-none border-gray-400 outline-none focus:border-b-2 focus:bg-whited/40 transition-colors"
                name="Categoria"
              >
                {category.map((category) => (
                  <option key={category.value} value={category.value}>
                    {" "}
                    {category.name}{" "}
                  </option>
                ))}
              </select>
              <label className="font-medium  text-gray-600" htmlFor="WeekDay">
                Asignale un día
              </label>
              <select
                className="w-full shadow-sm p-4 border-b rounded bg-gray-100 bg-none border-gray-400 outline-none focus:border-b-2 focus:bg-whited/40 transition-colors"
                name="WeekDay"
              >
                {weekDays.map((day) => (
                  <option key={day.value} value={day.value}>
                    {" "}
                    {day.name}{" "}
                  </option>
                ))}
              </select>
              <label className="font-medium  text-gray-600">Hora de inicio: </label>
              <TimePicker className={'rounded-lg'} disableClock={true} onChange={onChangeStartTime} value={startTime} />
              <label className="font-medium  text-gray-600">Hora de fin: </label>
              <TimePicker className={'rounded-lg'} disableClock={true} onChange={onChangeEndTime} value={endTime} />
              <input
                className="w-3/6 font-black mx-auto text-center bg-whited rounded-full shadow-md p-2 py-3 mt-4 uppercase text-sm text-gray-800 hover:cursor-pointer hover:bg-[#CEB094] transition-colors"
                type="submit"
                value="Crear tarea"
              />
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
