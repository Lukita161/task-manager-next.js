"use client"

import { ProfileForm } from "@/src/components/Profile/ProfileForm";
import SettingsModal from "@/src/components/SettingsModal";


export default function ProfilePage() {
    return (
        <>
        <ProfileForm />
        <SettingsModal/>
        </>
    )
}