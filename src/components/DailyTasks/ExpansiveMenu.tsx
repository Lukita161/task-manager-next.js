"use client"

import { Task } from '@/src/types'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'

type expansiveMenuProps = {
  taskId: Task['_id']
}

export function ExpansiveMenu({ taskId }: expansiveMenuProps) {
  const router = useRouter()
  const pathname = usePathname()
  const homePage = pathname === '/'
  return (
    <Menu>
      <MenuButton> <EllipsisHorizontalIcon className='text-gray-700' width={25} height={25} /> </MenuButton>
      <MenuItems anchor="bottom" className='flex flex-col gap-3 items-start justify-start bg-white p-6 rounded-md'>
        <MenuItem>
          <button onClick={()=> router.push(homePage ? `?taskId=${taskId}&viewTask=true` : `?taskId=${taskId}&viewWeekTask=true`)} className='text-gray-800 font-medium hover:text-gray-600'>Ver tarea</button>
        </MenuItem>
        <MenuItem>
          <button onClick={()=> router.push(homePage ? `?taskId=${taskId}&editTask=true` : `?taskId=${taskId}&editWeekTask=true`)} className='text-gray-800 font-medium hover:text-gray-600'>Editar tarea</button>
        </MenuItem>
        <MenuItem>
          <button onClick={()=> router.push(homePage ? `?taskId=${taskId}&deleteTask=true` : `?taskId=${taskId}&deleteWeekTask=true`)} className='text-red-600 font-medium hover:text-red-400'>Eliminar</button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}