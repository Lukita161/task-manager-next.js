"use client";

import { getProfileImage } from "@/src/logic/getProfileImage";
import { CldUploadWidget } from "next-cloudinary";
import { PencilIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type ImageUploadProps = {
    setDisableInputs: Dispatch<SetStateAction<boolean>>
}

export const ImageUpload = ({setDisableInputs}: ImageUploadProps) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(()=> {
    const fetchProfileImage = async()=> {
        const profileImage = await getProfileImage()
        setImageUrl(profileImage)
    }
    fetchProfileImage()
},[])


  return (
    <>
      <CldUploadWidget
        uploadPreset="gegyanqg"
        onSuccess={(result, { widget }) => {
          if (result.event === "success") {
            // @ts-ignore
            setImageUrl(result.info.secure_url);
          }
        }}
        onQueuesEnd={(result, {widget}) => {
            widget.close();
        }}
      >
        {({ open }) => {
          return (
          <>
            {imageUrl && (
              <div className="relative inline-block">
              <Image onClick={()=> {
                open()
                setDisableInputs(false)
              }} src={imageUrl} alt="Imagen perfil" width={150} height={150} className="rounded-full mx-auto hover:opacity-75 transition-opacity cursor-pointer" />
              </div>
            )}
          </>
          )
        }}
      </CldUploadWidget>
      <input type="hidden" name="image" value={imageUrl} />
    </>
  );
};
