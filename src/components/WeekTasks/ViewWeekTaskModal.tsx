"use client";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { translateCategory } from "@/src/utils";
import { useFetchWeekTaskById } from "@/src/hooks/useFetchWeekTaskById";
import { dayTranslation } from "@/src/utils";
import { updateWeekTaskStatus } from "@/actions/weekTasks/update-week-task-status";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { Task } from "@/src/types";
import { Spinner } from "../UI/Spinner";

// En base a los params llamamos a nuestra DB
export default function ViewWeekTaskmodal() {
  const router = useRouter();
  const params = useSearchParams();
  const isActive = params.get("viewWeekTask");
  const taskId = params.get("taskId")!;
  const [completed, setCompleted] = useState<Task['completed']>()

  const { task, loading } = useFetchWeekTaskById(taskId);
  const handleClick = async()=> {
    await updateWeekTaskStatus(taskId)
    setCompleted(task.completed)
    if(isCompleted) {
      toast.success('Tarea completada')
    } else {
      toast.error('Tarea incompleta')
    }
    closeModal()
  }
  const isCompleted = useMemo(()=> completed,[completed])

  if (loading) return <Spinner/>;
  const closeModal = () => router.push("/week");

  if (task)
    return (
      <>
        <Dialog
          open={Boolean(isActive)}
          onClose={closeModal}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg lg:w-[100vw] space-y-4 border rounded-md bg-white p-12">
              <DialogTitle className="font-black text-gray-800 text-3xl border-b border-gray-300 uppercase mb-8 text-center">
                {" "}
                <h1>{task.name}</h1>{" "}
              </DialogTitle>
              <Description>
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-gray-700 font-medium">
                      Descripcion:{" "}
                      <span className="text-gray-800 font-bold">
                        {task.description}
                      </span>{" "}
                    </h3>
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="text-gray-700 font-medium">
                      Hora de inicio:{" "}
                      <span className="text-gray-800 font-bold">
                        {task.startTime}
                      </span>
                    </p>
                    <p className="text-gray-700 font-medium">
                      Hora de final:{" "}
                      <span className="text-gray-800 font-bold">
                        {task.endTime}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Categoria: <span className="text-gray-800 font-bold">{translateCategory[task.category]}</span></p>
                    <p className="text-gray-700 font-medium">Dia asignado: <span className="text-gray-800 font-bold">{dayTranslation[task.day]}</span></p>
                  </div>
                  <div>
                    <p onClick={handleClick} className={`font-bold text-gray-800 cursor-pointer text-center p-2 rounded-md shadow ${isCompleted ? 'bg-emerald-500/50 hover:bg-emerald-500/75' : 'bg-slate-400/50 opacity-80 hover:bg-slate-400/75'} hover:transition-colors`}>{isCompleted ? 'Marcar completada' : "Marcar incompleta"}</p>
                  </div>
                </div>
              </Description>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    );
}
