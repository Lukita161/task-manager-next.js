"use client"


import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { getProviders } from "next-auth/react"; 
import Link from "next/link";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { ProfileImage } from "./ProfileImage";
import { useProfileInfo } from "@/src/hooks/useProfileInfo";

export const ProfileButton = () => {
  const { userInfo } = useProfileInfo()
  const handleClick = async()=> {
    toast.success('Sesion cerrada')
    await signOut({callbackUrl: '/auth/login'})
  }
  return (
    <>
      <div className="relative w-[38px] h-[38px] rounded-full border-2 border-gray-300 bg-whited hover:opacity-85 cursor-pointer">
        <ProfileImage />
        <Popover className="relative w-full h-full">
          <PopoverButton className={"w-full h-full outline-none"}></PopoverButton>
          <PopoverPanel anchor="right" className="flex flex-col ml-3 p-3 bg-white rounded-md items-center justify-center text-pretty">
            <h1 className="text-gray-700">Bienvenido! <span className="font-bold">{userInfo.name}</span></h1>
            <Link className="dark:text-gray-800" href={'/profile'}>Mi perfil</Link>
            <button className="text-red-600 font-bold" onClick={handleClick}>Cerrar sesion</button>
          </PopoverPanel>
        </Popover>
      </div>
    </>
  );
};
