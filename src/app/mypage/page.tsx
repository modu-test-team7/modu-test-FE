'use client';

import React from 'react';

import { useState, useEffect, useRef } from 'react';
import { RiImageEditFill, RiEdit2Fill } from 'react-icons/ri';
import { BsCheckLg } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { TextField } from '@mui/material';
import Loading from '@/components/Loading';
import UnderLineInput from '@/components/Input/UnderIineInput';
import Image from 'next/image';
import profileImage from '../../../public/lib/images/profile/profile.jpg';
import { ChangeEvent, FC, ReactElement } from 'react';

const Page: FC<PageProps> = (): ReactElement => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      router.replace('/');
    }
  }, [router]);

  // 초기값은 프로필 사진 없을 때 넣을 기본 이미지
  const [image, setImage] = useState<string>('/lib/images/blank.png');
  const fileInput = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [tempUsername, setTempUsername] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value.length > 15) {
      setError('닉네임은 15자를 초과할 수 없습니다.'); // 15자를 초과하면 에러 메시지 설정
    } else {
      setError(null); // 그렇지 않으면 에러 메시지 제거
    }
    setTempUsername(value); // 사용자가 입력한 값을 tempUsername 상태에 저장
  };

  // 닉네임 edit 아이콘🖍 클릭 시,
  const handleEditIconClick = (): void => {
    setIsEditing(true);
    setTempUsername(username);
  };

  // 닉네임 수정 후 체크✅ 아이콘 클릭 시,
  const handleCheckIconClick = (): void => {
    setIsEditing(false);
    setUsername(tempUsername);
  };

  // 닉네임 수정 후 🚫 cancle 아이콘 클릭 시,
  const handleCancelIconClick = (): void => {
    setIsEditing(false);
  };

  const handleImage = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    // 내가 받을 파일은 하나기 때문에 index 0값의 이미지를 가짐
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    // 이미지 화면에 띄우기
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: Event) => {
      const target = e.target as FileReader;
      if (target.readyState === FileReader.DONE) {
        setImage(target.result as string);
      }
    };

    // 이미지 파일을 formData에 담아서 서버에 보내고, 서버는 받은 이미지 파일을 S3에 저장하고 받은 URL 값을 클라이언트로 반환해준다.
    const formData = new FormData();
    formData.append('image', file);
    try {
      const imageRes = await axios.post(process.env.NEXT_PUBLIC_TEST_SERVER_URL!, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const image_URL = imageRes.data.imageURL;
    } catch (e: any) {
      console.error(e.response);
    }
  };

  return (
    <div className="w-[800px] h-[100%] mx-auto mt-16 p-8 flex bg-[--dark_gray]">
      <div className="relative">
        <div className="flex flex-col justify-center items-center h-[150px] w-[150px] rounded-full overflow-hidden border border-gray-300">
          <Image
            src={image !== '/lib/images/blank.png' ? image : profileImage}
            alt="프로필 사진"
            width={150}
            height={150}
          />
        </div>
        {/* 실제 이미지 받을 file 타입의 input */}
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
          {/* 이미지 파일 업로드 아이콘 */}
          <label
            className="absolute bottom-2 right-0 z-500 flex items-center justify-center h-10 w-10 rounded-full bg-black"
            htmlFor="input-file"
            style={{ cursor: 'pointer' }}
          >
            <RiImageEditFill className="text-white" size={24} />
          </label>
        </div>
      </div>

      <div className="flex-col m-auto">
        <h5 className="text-lg">환영합니다 👼</h5>
        <div className="flex">
          {isEditing ? (
            <>
              <UnderLineInput
                value={tempUsername}
                onChange={handleUsernameChange}
                inputProps={{ maxLength: 15 }} // 글자 수를 15자로 제한
                error={!!error} // 에러 상태에 따라 error 속성 설정
                helperText={error} // 에러 메시지 표시
              />
              <div className="cursor-pointer ml-1 mt-5" onClick={handleCheckIconClick}>
                <BsCheckLg />
              </div>
              <div className="cursor-pointer ml-1 mt-5" onClick={handleCancelIconClick}>
                <MdOutlineCancel />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl">{username}</h1>
              <div className="cursor-pointer ml-1 mt-5" onClick={handleEditIconClick}>
                <RiEdit2Fill />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Page;
