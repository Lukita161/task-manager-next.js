"use client";

import { updateStatus } from "@/actions/update-task-status";
import { Task } from "@/src/types";
import { toast } from "react-toastify";
import { ExpansiveMenu } from "./ExpansiveMenu";

export const TaskDetail = ({ task }: { task: Task }) => {
  const handleChange = async () => {
    await updateStatus(task._id);
    if (task.completed === true) {
      toast.error("Tarea desecha");
    } else {
      toast.success("Tarea completada");
    }
  };

  return (
    <>
    <div className="flex gap-2 items-center border-b">
      <input
        defaultChecked={task.completed}
        onChange={handleChange}
        type="checkbox"
        className="w-3 h-3 rounded-lg"
      ></input>
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col">
          <h1
            className={`${
              task.completed ? "line-through" : ""
            }  text-xl font-black text-gray-600`}
          >
            {" "}
            {task.name}{" "}
          </h1>
          <h1
            className={`${
              task.completed ? "line-through" : ""
            }  text-lg font-medium text-gray-500`}
          >
            {" "}
            {task.description}{" "}
          </h1>
        </div>
        <ExpansiveMenu taskId={task._id} />
      </div>
    </div>
    </>
  );
};
