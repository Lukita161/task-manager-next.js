import { LoginForm } from "@/src/components/Auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="w-[50vw] h-full lg:w-[35vw] sm:h-full p-6 rounded-lg shadow-sm shadow-whited bg-whited">
            <main className="flex flex-col gap-2 h-full justify-around">
                <div className="flex flex-col gap-2">
                <h1 className="text-4xl text-gray-800 font-bold uppercase text-center">Bienvenido</h1>
                <h3 className="text-gray-600 text-center">¿No tienes una cuenta? <Link href={'/auth/register'} className="underline font-bold text-gray-700 cursor-pointer">Crea una</Link></h3>

                </div>
                <div className="mb-8">
                <LoginForm />
                </div>
            </main>
            
        </div>
    )
}