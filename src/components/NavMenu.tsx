"use client"

import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline"
import { CalendarDaysIcon } from "@heroicons/react/24/outline"
import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export const NavMenu = ()=> {
  const params = usePathname()
  const [darkMode, setDarkMode] = useState(false)
  
  const linkActive = (href: string)=> href === params
  const handleClick = ()=> {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

    return (
        <nav className="flex flex-col gap-6 items-center justify-center w-30 md:w-20 lg:w-20 h-screen bg-blacked/90 dark:bg-whited/70 shadow-md shadow-gray-700 right-2">
        <Link className={`flex items-center w-full justify-center hover:bg-whited/10 p-3 ${linkActive('/') && 'border-l-4 border-whited dark:border-gray-700 bg-whited/10' }`} href={"/"}> <ClipboardDocumentListIcon className="text-whited dark:text-gray-800" width={35} height={35} /> </Link>
        <Link className={`flex items-center w-full justify-center hover:bg-whited/10 p-3 ${linkActive('/week') && 'border-l-4 border-whited dark:border-gray-700 bg-whited/10' }`} href={"/week"}> <CalendarDaysIcon className="text-whited dark:text-gray-800" width={35} height={35} /> </Link>
        <Link className={`flex items-center w-full justify-center hover:bg-whited/10 p-3 ${linkActive('/setting') && 'border-l-4 border-whited dark:border-gray-700 bg-whited/10' }`} href={"/setting"}> <Cog8ToothIcon className="text-whited dark:text-gray-800" width={35} height={35} /> </Link>
        <button onClick={handleClick} className="w-full text-white">Dark mode</button>
      </nav>
    )
}