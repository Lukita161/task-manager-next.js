import { ConfirmAccountForm } from "@/src/components/Auth/ConfirmAccountForm";

export default function ConfirmAccountPage () {
    return (
        <>
        <div className="w-[25vw] h-[60vh] sm:h-[70vh] p-6 mt-20 rounded-lg shadow-xl bg-whited flex flex-col space-y-24">
            <div>
                <h1 className="text-lg text-gray-800">Ingresa tu token de verificacion y <span className="font-black text-terciary">confirma tu cuenta: </span></h1>
            </div>
            <div >
            <ConfirmAccountForm />   
            </div>
        </div>
        </>
    )
}