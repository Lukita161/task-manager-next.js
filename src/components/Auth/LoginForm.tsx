"use client"


import { toast } from "react-toastify"
import { signIn } from 'next-auth/react'
import { sign } from "crypto"
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
        <form action={handleAction} className="w-full h-full flex flex-col gap-5 justify-center">
			<div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700" htmlFor="email">
          Email:{" "}
        </label>
        <input className="p-2 border rounded-md border-gray-300 focus:bg-gray-100 focus:border-b-2 focus:outline-none" name="email" type="text" placeholder="Email..." />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700" htmlFor="password">
          Contraseña:{" "}
        </label>
        <input className="p-2 border rounded-md border-gray-300 focus:bg-gray-100 focus:border-b-2 focus:outline-none" name="password" type="text" placeholder="123456789..." />
      </div>
			<div className="flex flex-col">
				<input className="w-[80%] mx-auto p-2 rounded-md bg-terciary text-white uppercase hover:cursor-pointer hover:bg-terciary/80 transition-colors" type="submit" value="Iniciar sesion" />
			</div>
    </form>
    )
}