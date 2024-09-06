"use client"

import Image from "next/image";
import PopOverProfileMenu from "./PopOverProfileMenu";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export const ProfileButton = () => {
  
  const handleClick = async()=> {
    await signOut()
    toast.success('Sesion cerrada')
  }
  return (
    <>
      <div className="relative w-[38px] h-[38px] rounded-full border-2 border-gray-300 bg-whited hover:opacity-85 cursor-pointer">
        <Image
          fill
          className="rounded-full"
          src={"/perro-lindo-arte-digital.jpg"}
          alt="logo"
        />
        <Popover className="relative w-full h-full">
          <PopoverButton className={"w-full h-full outline-none"}></PopoverButton>
          <PopoverPanel anchor="right" className="flex flex-col ml-3 p-3 bg-white rounded-md">
            <Link href={'/profile'}>Mi perfil</Link>
            <button onClick={handleClick}>Cerrar sesion</button>
          </PopoverPanel>
        </Popover>
      </div>
    </>
  );
};
