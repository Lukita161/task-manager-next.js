"use client"

import { useEffect } from "react"

export default function Template({ children }: { children: React.ReactNode }) {
    useEffect(()=> {
        if(typeof window !== 'undefined') {
            const isDark = localStorage.getItem('darkMode')
            if(isDark === 'dark') {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
    },[])
    return <div>{children}</div>
  }