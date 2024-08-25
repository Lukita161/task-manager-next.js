"use client"

import { Task } from '@/src/types'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

type expansiveMenuProps = {
  taskId: Task['_id']
}

export function ExpansiveMenu({ taskId }: expansiveMenuProps) {
  const router = useRouter()
  return (
    <Menu>
      <MenuButton> <EllipsisHorizontalIcon className='text-gray-700' width={25} height={25} /> </MenuButton>
      <MenuItems anchor="bottom" className='flex flex-col gap-3 items-start justify-start bg-white p-6 rounded-md'>
        <MenuItem>
          <button onClick={()=> router.push(`?taskId=${taskId}&viewTask=true`)} className='text-gray-800 font-medium hover:text-gray-600'>Ver tarea</button>
        </MenuItem>
        <MenuItem>
          <button onClick={()=> router.push(`?taskId=${taskId}&editTask=true`)} className='text-gray-800 font-medium hover:text-gray-600'>Editar tarea</button>
        </MenuItem>
        <MenuItem>
          <button onClick={()=> router.push(`?taskId=${taskId}&deleteTask=true`)} className='text-red-600 font-medium hover:text-red-400'>Eliminar</button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}