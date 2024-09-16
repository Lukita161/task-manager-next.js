"use client"

import { registerUser } from "@/actions/auth/register-user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "../UI/Spinner";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleAction = async(formData: FormData)=> {
    setLoading(true)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }
    const user = await registerUser(data)
    if(user?.errors) {
      user.errors.forEach(issue => {
        toast.error(issue.message)
        setLoading(false)
      })
    } else {
      toast.success('Usuario creado, revisa tu email')
      setLoading(false)
      router.push('/auth/confirm-account')
    }
  }

  return (
    <form action={handleAction} className="w-full h-full flex flex-col gap-3 justify-center">
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700" htmlFor="name">
          Nombre de usuario:{" "}
        </label>
        <input className="p-3 border rounded-md bg-gray-800/20 border-gray-600 focus:border-gray-300 focus:outline-none placeholder:text-gray-500 transition-colors" name="name" type="text" placeholder="Nombre de usuario..." />
      </div>
			<div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700" htmlFor="email">
          Email:{" "}
        </label>
        <input className="p-3 border rounded-md bg-gray-800/20 border-gray-600 focus:border-gray-300 focus:outline-none placeholder:text-gray-500 transition-colors" name="email" type="text" placeholder="Email..." />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700" htmlFor="password">
          Contraseña:{" "}
        </label>
        <input className="p-3 border rounded-md bg-gray-800/20 border-gray-600 focus:border-gray-300 focus:outline-none placeholder:text-gray-500 transition-colors" name="password" type="password" placeholder="123456789..." />
      </div>
			<div className="flex flex-col">
				<button className="w-full mt-2 mx-auto p-3 rounded-md bg-secundary text-gray-900 font-black uppercase hover:cursor-pointer hover:bg-[#6f7180] transition-colors" type="submit" >{loading ? <Spinner/> : 'Registrarme'}</button>
			</div>
    </form>
  );
};
