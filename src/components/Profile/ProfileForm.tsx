"use client";

import { ChangeUserData } from "@/actions/profile/change-user-data";
import { useProfileInfo } from "@/src/hooks/useProfileInfo";
import { ChangeUserSchema } from "@/src/schemas";
import { signOut } from "next-auth/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";

export const ProfileForm = () => {
  const [disableInputs, setDisableInputs] = useState(true);
  const { userInfo, loading } = useProfileInfo();
  const handleAction = async (formData: FormData) => {
    const data = {
      email: formData.get("email"),
      name: formData.get("username"),
    };
    const result = ChangeUserSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    await ChangeUserData(result.data, userInfo.email);
    toast.success("Información actualizada, redirigiendo a iniciar sesión");
    signOut({ callbackUrl: "/auth/login" });
  };

  if (loading) return "Cargando...";
  if (userInfo)
    return (
      <form
        action={handleAction}
        className="flex flex-col gap-4 p-4 shadow rounded-md bg-gray-100"
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700 text-sm" htmlFor="email">
            Email:{" "}
          </label>
          <div className="flex gap-2 items-center">
            <input
            disabled={disableInputs}
              defaultValue={userInfo.email}
              className="w-[90%] p-2 border border-gray-300 rounded-md outline-none transition-colors focus:border-blue-500"
              type="email"
              name="email"
            />
            {disableInputs && <PencilSquareIcon onClick={()=>setDisableInputs(false)} className="w-5 h-5 cursor-pointer hover:opacity-70" />}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="font-medium text-gray-700 text-sm"
            htmlFor="username"
          >
            Nombre de usuario:{" "}
          </label>
          <div className="flex gap-2 items-center">
          <input
          disabled={disableInputs}
            defaultValue={userInfo.name}
            className="w-[90%] p-2 border border-gray-300 rounded-md outline-none transition-colors focus:border-blue-500"
            type="text"
            name="username"
          />
          {disableInputs && <PencilSquareIcon onClick={()=>setDisableInputs(false)} className="w-5 h-5 cursor-pointer hover:opacity-70" />}
          </div>
          
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="font-medium text-gray-700 text-sm"
            htmlFor="profile-image"
          >
            Imagen de perfil:{" "}
          </label>
        </div>
        <div className="flex mx-auto">
          <input
            type="submit"
            value="Confirmar"
            className="p-2 px-4 rounded-md bg-whited text-gray-800 font-bold text-center shadow-sm cursor-pointer"
          />
        </div>
      </form>
    );
};
