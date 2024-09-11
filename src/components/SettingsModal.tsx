"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SettingsModal() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
	const pathname = usePathname()
  const isActive = params.get("settings");

  const closeModal = () => {
		if(pathname==='/') router.push('/')
			else router.push('/week')
	};
  const handleClick = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  const handleSignOut = ()=> {
    toast.success('Cerrando sesión')
    signOut({callbackUrl: '/auth/login'})
  }

  return (
    <>
      <Dialog
        open={Boolean(isActive)}
        onClose={closeModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center bg-blacked/15 justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white shadow-md p-12">
            <DialogTitle className="font-bold text-2xl text-gray-800 text-center border-b border-gray-300">
              Configuración
            </DialogTitle>
            <div className="">
              <button onClick={handleClick} className="w-full flex justify-center">
                {darkMode ? (
                  <SunIcon className="w-10 h-10 text-center" />
                ) : (
                  <MoonIcon className="w-10 h-10 text-center" />
                )}
              </button>
            </div>
            <div className="flex gap-4">
              <h2 onClick={handleSignOut} className="w-full bg-red-500 text-center rounded-md px-2 py-1 font-bold capitalize text-white cursor-pointer hover:bg-red-600">Cerrar sesion</h2>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
