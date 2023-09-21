'use client';

import React from 'react';
import TestPicture from '@/components/createTest/TestPictureButton';
import TestThumbnail from '@/components/createTest/TestThumbnail';
import TestInputGroup from '@/components/createTest/TestInputGroup';
import { useState, useEffect } from 'react';
import Button from '@/components/button/Button';
import { useRouter } from 'next/navigation';
import TestTitleInput from '@/components/createTest/TestTitleInput';
import { TextField } from '@mui/material';
import Image from 'next/image';
import clsx from 'clsx';
import Loading from '@/components/Loading';

type pageProps = {};

const Page: React.FC<pageProps> = () => {
  const router = useRouter();

  const routeCreateResult = () => {
    return router.push('/create-test-result');
  };

  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);

  useEffect(() => {
    // 클라이언트 쪽에서만 Router 객체를 사용하는 로직을 넣어줘
    setFadeOut(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) return <Loading fadeout={fadeout} isLoading={isLoading} />

  return (
    <form>
      <div className="w-[800px] h-[100%] mx-auto pt-[20px] flex flex-col justify-center mb-[50px]">
        <div className="h-[60px]">
          <TestTitleInput label="테스트 제목을 적어주세요" />
        </div>
        <div className="flex w-full flex-col justify-center items-center">
          <div className="w-full">
            <TestThumbnail thumbnail="123" />
          </div>
          <div className="ml-auto mt-[10px]">
            <TestPicture />
          </div>
        </div>
        <div className="mt-[40px] mb-[80px]">
          <TextField
            fullWidth
            label="테스트를 설명해주세요"
            id="fullWidth"
            multiline
            rows={4}
            variant="filled"
          />
          <input type="text" placeholder="태그를 추가 해 주세요" />
        </div>
        <div>
          <TestInputGroup />
        </div>

        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            router.push('/');
          }}
        >
          테스트 만들기 완성
        </Button>
      </div>
    </form>
  );
};
export default Page;
