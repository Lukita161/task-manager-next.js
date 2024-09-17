"use client"

import { confirmUser } from '@/actions/auth/confirm-user'
import { PinInput, PinInputField } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export const ConfirmAccountForm = ()=> {
    const router = useRouter()
    const handleComplete = async(value:string)=> {

        const confirmed = await confirmUser(value)
        if(confirmed?.errors) {
            toast.error(confirmed.errors)
            return
        }
        toast.success('Usuario validado')
        router.push('/auth/login')
    }
    return (
        <div className='space-x-3 text-center flex items-center justify-center'>
            <PinInput onComplete={handleComplete} >
                <PinInputField  className='w-10 h-10 text-center border border-gray-300 rounded-md' />
                <PinInputField  className='w-10 h-10 text-center border border-gray-300 rounded-md' />
                <PinInputField  className='w-10 h-10 text-center border border-gray-300 rounded-md' />
                <PinInputField  className='w-10 h-10 text-center border border-gray-300 rounded-md' />
                <PinInputField  className='w-10 h-10 text-center border border-gray-300 rounded-md' />
            </PinInput>
        </div>
    )
}