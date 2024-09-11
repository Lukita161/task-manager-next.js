"use client"

import { useEffect, useState } from "react";
import { UserType } from "../types";
import { getUserInfo } from "../logic/fetchUserInfo";
import { UserSchema } from "../schemas";


export const useProfileInfo = ()=> {
    const [userInfo, setUserInfo] = useState({} as UserType)
    const [loading, setLoading] = useState(false)
    try {
        useEffect(()=> {
            const fetchProfile = async() => {
                setLoading(true)
                const response = await getUserInfo()
                const result = UserSchema.safeParse(response)
                if(result.success) {
                    setUserInfo(result.data)
                    setLoading(false)
                } else return
            }
            fetchProfile()
            setLoading(false)
        },[])
    } catch (error) {
        console.error(error)
    }
    return { userInfo, loading }
}