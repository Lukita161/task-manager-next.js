import { ConfirmAccountForm } from "@/src/components/Auth/ConfirmAccountForm";
import Link from "next/link";

export default function ConfirmAccountPage () {
    return (
        <>
        <div className="w-[50vw] h-full lg:w-[30vw] sm:h-full p-6 rounded-lg shadow-sm shadow-whited bg-whited">
            <main className="flex flex-col h-full gap-24 mt-4 text-center">
                <div className="flex flex-col gap-2 items-start">
                <h1 className="text-3xl text-gray-800 font-bold uppercase text-center">Te estabamos esperando</h1>
                <h3 className="text-gray-600 text-center">Ingresa tu token a continuación para validar tu cuenta</h3>
                <p className="text-gray-600 text-center mx-auto">¿No encuentras tu token? Revisa tu email</p>
                </div>
                <div className="mb-8">
                <ConfirmAccountForm />
                </div>
            </main>
            
        </div>
        </>
    )
}