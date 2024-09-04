import { Task } from "../types";


export const generateRandomToken = () => Math.floor(100000 * Math.random()).toString()

export const dayStyle: { [key: string]: string } = {
    monday: "border-red-400",
    tuesday: "border-green-300",
    wednesday: "border-purple-500",
    thursday: "border-teal-400",
    friday: "border-orange-400",
    saturday: "border-emerald-400",
    sunday: "border-indigo-500",
  };

export const dayTranslation: { [key: string]: string } = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miercoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
  };

  export const translateCategory: {[key: string]: string} = {
    general: "General",
    job: "Trabajo",
    study: "Estudio",
    health: "Salud"
}