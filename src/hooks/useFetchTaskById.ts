"use client";

import { useEffect, useState } from "react";
import { Task } from "../types";
import { TaskSchema } from "../schemas";
import { getTaskbyId } from "../logic/fetchFunctions";

export const useFetchTaskById = (taskId: Task["_id"]) => {
  const [task, setTask] = useState({
    _id: "",
    name: "",
    description: "",
    completed: false || true,
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const clearTask = ()=> setTask({
    _id: "",
    name: "",
    description: "",
    completed: false || true,
    category: "",
  })

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        if (taskId !== null) {
          const task = await getTaskbyId(taskId);
          const response = TaskSchema.safeParse(task);
          if (response.success) {
            setTask(response.data);
            setLoading(false);
          } 
        } else return
      } catch {
        console.log("Algo esta mal");
      }
    };
    fetchTask();
    setLoading(false);
  }, [taskId]);
  return { task, loading, clearTask };
};
