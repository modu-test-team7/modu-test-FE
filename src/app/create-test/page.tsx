'use client';

import React from 'react';
import {
  TestInput,
  TestInputGroup,
  TestPictureButton,
  TestThumbnail,
} from '@/components/createTest';
import { useState, useEffect } from 'react';
import { Button, ButtonGroup, OAuthButton } from '@/components/button';
import { useRouter } from 'next/navigation';
import { TextField } from '@mui/material';
import axios from 'axios';
import Loading from '@/components/Loading';
import UnderLineInput from '@/components/Input/UnderIineInput';

type pageProps = {};

const Page: React.FC<pageProps> = () => {
  const router = useRouter();

  const handleSubmit = async () => {
    const data = {
      writer: '네가 원하는 작성자 이름',
      title: '테스트 제목',
      details: '테스트 내용',
    };

    try {
      const response = await axios.post('http://localhost:4000/testCards', data);
      console.log('성공:', response);
      router.push('/'); // 또는 다른 페이지로 리다이렉트
    } catch (error) {
      console.log('에러:', error);
    }
  };

  const CreateTestButton = () => {
    return router.push('/create-test');
  };

  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);

  useEffect(() => {
    // 클라이언트 쪽에서만 Router 객체를 사용하는 로직을 넣어줘
    setFadeOut(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) return <Loading fadeout={fadeout} isLoading={isLoading} />;

  return (
    <form onSubmit={CreateTestButton}>
      <div className="w-[800px] h-[100%] mx-auto pt-[20px] flex flex-col justify-center mb-[50px]">
        <div className="h-[60px] mt-[50px] text-sm">
          <UnderLineInput label="테스트 제목을 적어주세요" />
        </div>

        <div className="flex w-full flex-col justify-center items-center">
          <div className="w-full">
            <TestThumbnail thumbnail="123" />
          </div>
          <div className="ml-auto mt-[10px]">
            <TestPictureButton />
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
          {/* <select>
            <option value={} />
          </select> */}
        </div>
        <div>
          <TestInputGroup />
        </div>

        <Button type="button" primary fullWidth onClick={handleSubmit}>
          테스트 만들기 완성
        </Button>
      </div>
    </form>
  );
};
export default Page;
