
import { RegisterForm } from "@/src/components/Auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage () {
    return (
        <div className="w-[50vw] h-full lg:w-[35vw] sm:h-full p-6 rounded-lg shadow-sm shadow-whited bg-whited">
            <main className="flex flex-col gap-2 h-full justify-around">
                <div className="flex flex-col gap-2">
                <h1 className="text-4xl text-gray-800 font-bold uppercase text-center">Bienvenido</h1>
                <h3 className="text-gray-600 text-center">¿Ya tienes cuenta? <Link href={'/auth/login'} className="underline font-bold text-gray-700 cursor-pointer">Inicia sesión</Link></h3>

                </div>
                <div>
                <RegisterForm />
                </div>
            </main>
            
        </div>
    )
}