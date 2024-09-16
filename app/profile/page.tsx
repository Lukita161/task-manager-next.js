import { ProfileForm } from "@/src/components/Profile/ProfileForm";
import { ProfileTab } from "@/src/components/Profile/Tab";
import SettingsModal from "@/src/components/SettingsModal";


export default function ProfilePage() {
    return (
        <>
        <ProfileForm />
        <SettingsModal/>
        </>
    )
}