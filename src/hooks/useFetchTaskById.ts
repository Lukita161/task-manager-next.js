"use client"


import { useEffect, useState } from "react";
import { Task } from "../types";
import { TaskSchema } from "../schemas";
import { getTaskbyId } from "../logic/fetchFunctions";

export const useFetchTaskById = (taskId: Task['_id'])=> {
    const [task, setTask] = useState({
        _id: '',
        name: "",
        description: "",
        completed: false||true,
        category: ''
    })
    const [loading, setLoading] = useState(false)


    useEffect(()=> {
        const fetchTask = async()=> {
            setLoading(true)
            try {
                const task = await getTaskbyId(taskId)
                const response = TaskSchema.safeParse(task)
                if(response.success) {
                    setTask(response.data)
                    setLoading(false)
                }
                
            } catch {
                console.log('Algo esta mal')
            }
        }
        fetchTask()
        setLoading(false)
    },[taskId])
    return { task, loading }
}