
import { ChangePasswordForm } from "@/src/components/Profile/Change-Password/ChangePasswordForm";
import { getServerSession } from "next-auth";

export default async function ChangePasswordPage() {
    const session = await getServerSession()
    const email = session?.user?.email!

    return (
        <ChangePasswordForm email={email}/>
    )
}