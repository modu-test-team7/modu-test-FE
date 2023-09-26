'use client';
import React, { useRef, useState } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import Image from 'next/image';
import profileImage from '../../../../public/lib/images/profile/profile.jpg';
import { ChangeEvent } from 'react';

type ProfileImageProps = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ image, setImage }) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImage = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: Event) => {
      const target = e.target as FileReader;
      if (target.readyState === FileReader.DONE) {
        setImage(target.result as string);
      }
    };
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center h-[150px] w-[150px] rounded-full overflow-hidden border ml-5">
        <Image
          src={image !== '/lib/images/blank.png' ? image : profileImage}
          alt="프로필 사진"
          width={150}
          height={150}
        />
        <input
          type="file"
          name="image_URL"
          id="input-file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleImage}
        />
        <div>
          <label
            className="absolute bottom-2 right-0 z-500 flex items-center justify-center h-10 w-10 rounded-full bg-black"
            htmlFor="input-file"
            style={{ cursor: 'pointer' }}
          >
            <RiImageEditFill className="text-white" size={24} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
