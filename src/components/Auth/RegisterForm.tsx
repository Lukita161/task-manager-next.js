"use client"

import { registerUser } from "@/actions/auth/register-user";
import { toast } from "react-toastify";

export const RegisterForm = () => {
  const handleAction = async(formData: FormData)=> {
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }
    const user = await registerUser(data)
    if(user?.errors) {
      user.errors.forEach(issue => {
        toast.error(issue.message)
      })
    }
    toast.success('Usuario creado')
  }

  return (
    <form action={handleAction} className="w-full h-full flex flex-col gap-5 justify-center">
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700" htmlFor="name">
          Nombre de usuario:{" "}
        </label>
        <input className="p-4 border rounded-md border-gray-300 focus:bg-gray-100 focus:border-b-2 focus:outline-none" name="name" type="text" placeholder="Nombre de usuario..." />
      </div>
			<div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700" htmlFor="email">
          Email:{" "}
        </label>
        <input className="p-4 border rounded-md border-gray-300 focus:bg-gray-100 focus:border-b-2 focus:outline-none" name="email" type="text" placeholder="Email..." />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700" htmlFor="password">
          Contraseña:{" "}
        </label>
        <input className="p-4 border rounded-md border-gray-300 focus:bg-gray-100 focus:border-b-2 focus:outline-none" name="password" type="text" placeholder="123456789..." />
      </div>
			<div className="flex flex-col">
				<input className="w-[80%] mx-auto p-2 rounded-md bg-terciary text-white uppercase hover:cursor-pointer hover:bg-terciary/80 transition-colors" type="submit" value="Registrarme" />
			</div>
    </form>
  );
};
