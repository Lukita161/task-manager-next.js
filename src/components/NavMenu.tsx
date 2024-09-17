"use client"

import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline"
import { CalendarDaysIcon } from "@heroicons/react/24/outline"
import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ProfileButton } from "./UI/ProfileButton"

export const NavMenu = ()=> {
  const params = usePathname()
  const router = useRouter()
  const linkActive = (href: string)=> href === params


    return (
        <nav className="flex sticky top-0 flex-col gap-6 items-center justify-center w-30 md:w-20 lg:w-20 min-h-screen bg-blacked/90 dark:bg-whited/70 shadow-md shadow-gray-700 right-2">
          <ProfileButton />
          <Link aria-label="Daily Tasks" className={`flex items-center w-full justify-center hover:bg-whited/10 p-3 ${linkActive('/') && 'border-l-4 border-whited dark:border-gray-700 bg-whited/10' }`} href={"/"}> <ClipboardDocumentListIcon className="text-whited dark:text-gray-800" width={35} height={35} /> </Link>
        <Link aria-label="Week Tasks" className={`flex items-center w-full justify-center hover:bg-whited/10 p-3 ${linkActive('/week') && 'border-l-4 border-whited dark:border-gray-700 bg-whited/10' }`} href={"/week"}> <CalendarDaysIcon className="text-whited dark:text-gray-800" width={35} height={35} /> </Link>
        <button aria-label="Settings" onClick={()=> router.push(`?settings=true`)} className={`flex items-center w-full justify-center hover:bg-whited/10 p-3 ${linkActive('/setting') && 'border-l-4 border-whited dark:border-gray-700 bg-whited/10' }`}> <Cog8ToothIcon className="text-whited dark:text-gray-800" width={35} height={35} /> </button>
      </nav>
    )
}