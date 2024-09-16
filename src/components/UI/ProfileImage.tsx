"use client"

import { getProfileImage } from "@/src/logic/getProfileImage"
import Image from "next/image"
import { useEffect, useState } from "react"

export const ProfileImage = () => {
    const [profileImage, setProfileImage] = useState('')
    useEffect(()=> {
        const fetchProfileImage = async()=> {
            const profileImage = await getProfileImage()
            setProfileImage(profileImage)
        }
        fetchProfileImage()
    },[])
    return (
        <Image
          fill
          className="rounded-full"
          src={profileImage && profileImage }
          alt="logo"
        />
    )
}