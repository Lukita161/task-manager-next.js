"use client"

import { ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'

export const ToastNotification = ()=> {
    return (
        <ToastContainer limit={2} pauseOnHover={false} />
    )
}