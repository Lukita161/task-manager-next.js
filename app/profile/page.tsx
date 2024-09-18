

import { ProfileForm } from "@/src/components/Profile/ProfileForm";
import SettingsModal from "@/src/components/SettingsModal";

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
    return (
        <>
        <ProfileForm />
        <SettingsModal/>
        </>
    )
}