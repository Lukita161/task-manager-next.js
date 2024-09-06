"use client";

import { updateStatus } from "@/actions/tasks/update-task-status";
import { Task } from "@/src/types";
import { toast } from "react-toastify";
import { ExpansiveMenu } from "./ExpansiveMenu";
import { categoryOptionalStyle } from "@/src/data/category";
import { useRouter } from "next/navigation";

export const TaskDetail = ({ task }: { task: Task }) => {
  const router = useRouter()
  const handleChange = async () => {
    await updateStatus(task._id);
    if (task.completed === true) {
      toast.error("Tarea desecha");
    } else {
      toast.success("Tarea completada");
    }
  };
  const borderColor = categoryOptionalStyle(task.category)

  if(task) return (
    <>
    <div className={`flex gap-2 items-center border-b-4 ${borderColor}`}>
      <input
        defaultChecked={task.completed}
        onChange={handleChange}
        type="checkbox"
        className="ml-2 mr-2 w-4 h-4 checked:bg-blue-400"
      />
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col">
          <h1
            onClick={()=> router.push(`?taskId=${task._id}&viewTask=true`)}
            className={`hover:underline hover:cursor-pointer ${
              task.completed ? "line-through" : ""
            }  text-xl font-black text-gray-600 dark:text-gray-200`}
          >
            {" "}
            {task.name}{" "}
          </h1>
          <h1
            className={`${
              task.completed ? "line-through" : ""
            }  text-lg font-medium text-gray-500 dark:text-gray-200`}
          >
            {" "}
            {task.description.length>70 ? task.description.slice(0,70)+'...' : task.description}{" "}
          </h1>
        </div>
        <ExpansiveMenu taskId={task._id} />
      </div>
    </div>
    </>
  );
};
