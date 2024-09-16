"use client";

import { ChangePasswordAction } from "@/actions/profile/change-password-action";
import { ChangePasswordSchema } from "@/src/schemas";
import { UserType } from "@/src/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type ChangePasswordFormProps = {
  email: UserType["email"];
};

export const ChangePasswordForm = ({ email }: ChangePasswordFormProps) => {
    const router = useRouter()
  const handleAction = async (formData: FormData) => {
    const data = {
      currentPassword: formData.get("current-password"),
      newPassword: formData.get("new-password"),
      confirmedPassword: formData.get("confirm-password"),
    };
    const result = ChangePasswordSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    try {
      const fetch = await ChangePasswordAction(data, email);
      if (fetch?.result) {
        toast.success("Contraseña actualizada");
        router.push('/profile')
      } 
    } catch (error) {
        const errorAsError = error as Error
        toast.error(errorAsError.message)
    }
  };
  return (
    <form
      action={handleAction}
      className="flex flex-col gap-4 p-4 shadow rounded-md bg-gray-100 dark:bg-gray-200"
    >
      <div className="flex flex-col gap-2">
        <label
          className="font-medium text-gray-700 text-sm dark:text-gray-800"
          htmlFor="current-password"
        >
          Contraseña actual:{" "}
        </label>
        <input
          className="p-2 border border-gray-300 rounded-md outline-none transition-colors focus:border-blue-500 dark:bg-gray-300 dark:border-gray-400"
          type="password"
          name="current-password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="font-medium text-gray-700 text-sm dark:text-gray-800"
          htmlFor="new-password"
        >
          Nueva contraseña:{" "}
        </label>
        <input
          className="p-2 border border-gray-300 rounded-md outline-none transition-colors focus:border-blue-500 dark:bg-gray-300 dark:border-gray-400"
          type="password"
          name="new-password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="font-medium text-gray-700 text-sm dark:text-gray-800"
          htmlFor="confirm-password"
        >
          Confirmar contraseña:{" "}
        </label>
        <input
          className="p-2 border border-gray-300 rounded-md outline-none transition-colors focus:border-blue-500 dark:bg-gray-300 dark:border-gray-400"
          type="password"
          name="confirm-password"
        />
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
