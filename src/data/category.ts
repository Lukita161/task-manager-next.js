import { Task } from "../types"

export const category = [
    {
        name: 'General',
        value: 'general',
    },
    {
        name: 'Trabajo',
        value: 'job'
    },
    {
        name: 'Estudio',
        value: 'study'
    },
    {
        name: 'Salud',
        value: 'health'
    },
]
export const categoryOptionalStyle = (value: string) => {
    switch (value) {
        case('general') : return 'border-b-[#fa33ff]'
        case('job') : return 'border-b-[#33ff8c]'
        case('study') : return 'border-b-[#33a1ff]'
        case('health') : return 'border-b-[#5be356]'
    }}

export const translateCategory = (value: Task['category']) => {
    switch (value) {
        case('general') : return 'General'
        case('job') : return 'Trabajo'
        case('study') : return 'Estudio'
        case('health') : return 'Salud'
    }
}