"use client"


import { toast } from "react-toastify"
import { signIn } from 'next-auth/react'
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import {Input} from "@nextui-org/input";
import { useRouter } from "next/navigation"

export const LoginForm = ()=> {
  const router = useRouter()

  const handleAction = async(formData: FormData)=> {
    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    }
    const res = await signIn('credentials', {email: data.email, password: data.password, redirect: false})
    if(res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Iniciando sesion')
      router.push('/')
    }
  }

    return (
        <form action={handleAction} className="w-full flex flex-col gap-5 justify-center">
			<div className="flex flex-col gap-1 justify-center">
        <label className="font-medium text-gray-700" htmlFor="email">
          Email:{" "}
        </label>
        <input className="p-3 border rounded-md bg-gray-800/20 border-gray-600 focus:border-gray-300 focus:outline-none placeholder:text-gray-500 transition-colors" name="email" type="text" placeholder="Email..."  />
      </div>
      <div className="flex flex-col  gap-1">
        <label className="font-medium text-gray-700" htmlFor="password">
          Contraseña:{" "}
        </label>
        <input className="p-3 border rounded-md bg-gray-800/20 border-gray-600 focus:border-gray-300 focus:outline-none placeholder:text-gray-500 transition-colors" name="password" type="password" placeholder="123456789..." />
      </div>
			<div className="flex flex-col text-center">
				<input className="w-full mt-2 mx-auto p-3 rounded-md bg-secundary text-gray-900 font-black uppercase hover:cursor-pointer hover:bg-[#6f7180] transition-colors" type="submit" value="Iniciar sesion" />
			</div>
    </form>
    )
}