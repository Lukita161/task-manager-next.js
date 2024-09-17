"use client";

import { useEffect, useState } from "react";
import { Task, WeekTask } from "../types";
import { WeekTaskSchema } from "../schemas";
import { getWeekTaskById } from "../logic/fetchFunctionForWeekTasks";
import { revalidatePath } from "next/cache";

export const useFetchWeekTaskById = (taskId: Task["_id"]) => {
  const [task, setTask] = useState({} as WeekTask);
  const [loading, setLoading] = useState(false);

  const clearTask = ()=> setTask({
    _id: '',
    category: '',
    completed: false || true,
    day: '',
    description: "",
    endTime: '',
    name: '',
    startTime: ""
  })

  useEffect(() => {
    const fetchWeekTask = async () => {
      setLoading(true);
      try {
        if (taskId !== null) {
          const task = await getWeekTaskById(taskId);
          const response = WeekTaskSchema.safeParse(task);
          if (response.success) {
            setTask(response.data);
            revalidatePath('/week')
          } 
        }
      } catch {
        console.log("Algo esta mal");
      } finally {
        setLoading(false)
      }
    };
    fetchWeekTask();
  }, [taskId, task.name]);
  return { task, loading, clearTask };
};
