"use client"

import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline"
import { CalendarDaysIcon } from "@heroicons/react/24/outline"
import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NavMenu = ()=> {
  const params = usePathname()
  
  const linkActive = (href: string)=> href === params

    return (
        <nav className="flex flex-col gap-8 items-center justify-center w-30 md:w-20 lg:w-20 h-screen bg-blacked/90">
        <Link className={`flex items-center w-full justify-center p-1 ${linkActive('/') && 'border-l-4 border-whited' }`} href={"/"}> <ClipboardDocumentListIcon color="white" width={35} height={35} /> </Link>
        <Link className={`flex items-center w-full justify-center p-1 ${linkActive('/week') && 'border-l-4 border-whited' }`} href={"/week"}> <CalendarDaysIcon color="white" width={30} height={30} /> </Link>
        <Link className={`flex items-center w-full justify-center p-1 ${linkActive('/setting') && 'border-l-4 border-whited' }`} href={"/setting"}> <Cog8ToothIcon color="white" width={30} height={30} /> </Link>
      </nav>
    )
}