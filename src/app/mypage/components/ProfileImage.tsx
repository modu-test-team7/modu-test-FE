// ProfileImage.jsx
import React, { useState, useRef, ChangeEvent } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import Image from 'next/image';
import profileImage from '../../../../public/lib/images/profile/profile.jpg';
import { BsCheckLg } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';

type ProfileImageProps = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileImage: React.FC<ProfileImageProps> = ({
  image,
  setImage,
  isEditing,
  setIsEditing,
}) => {
  const [tempImage, setTempImage] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImage = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: Event) => {
      const target = e.target as FileReader;
      if (target.readyState === FileReader.DONE) {
        setTempImage(target.result as string);
      }
    };
  };

  // const handleCheckIconClick = (): void => {
  //   setIsEditing(false);
  //   setImage(tempImage); // Save the edited image
  // };

  // const handleCancelIconClick = (): void => {
  //   setIsEditing(false);
  // };

  return (
    <div className="relative">
      <div className="flex justify-center items-center h-[150px] w-[150px] rounded-full overflow-hidden border ml-5">
        <Image src={profileImage} alt="프로필 사진" width={150} height={150} />
        <input
          type="file"
          name="image_URL"
          id="input-file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleImage}
        />
        {isEditing ? (
          <div className="flex">
            <label
              className="absolute bottom-2 right-0 z-500 flex items-center justify-center h-10 w-10 rounded-full bg-black"
              htmlFor="input-file"
              style={{ cursor: 'pointer' }}
            >
              <RiImageEditFill className="text-white" size={24} />
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileImage;
