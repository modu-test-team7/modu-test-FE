'use client';

import React, { ChangeEvent } from 'react';
import {
  TestInput,
  TestInputGroup,
  TestPictureButton,
  TestThumbnail,
  TestCaregory,
} from '@/components/createTest';
import { useState, useEffect } from 'react';
import { Button, ButtonGroup, OAuthButton } from '@/components/button';
import { useRouter, usePathname  } from 'next/navigation';
import { TextField } from '@mui/material';
import axios from 'axios';
import Loading from '@/components/Loading';
import UnderLineInput from '@/components/Input/UnderIineInput';
import { toast } from 'sonner';

type pageProps = {};

const Page: React.FC<pageProps> = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);

  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:4000/testCards', {
        writer: '김철수',
        title,
        content,
        image: thumbnail,
        views: 752,
        likes: 100,
        category,
      });
      toast.message('저장되었습니다')
      console.log('성공:', response);
      return router.push('/'); // 또는 다른 페이지로 리다이렉트
    } catch (error) {
      toast.message('실패하였습니다')
      console.log('에러:', error);
    }
  };

  useEffect(() => {
    // 클라이언트 쪽에서만 Router 객체를 사용하는 로직을 넣어줘
    setFadeOut(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) return <Loading fadeout={fadeout} isLoading={isLoading} />;

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="w-[800px] h-[100%] mx-auto pt-[20px] flex flex-col justify-center my-[50px]">
        <div className="h-[60px] mt-[50px] text-sm">
          <UnderLineInput label="테스트 제목을 적어주세요" value={title} setValue={setTitle} />
        </div>

        <div className="flex w-full flex-col justify-center items-center">
          <div className="w-full rounded-lg">
            <TestThumbnail picture={thumbnail} />
          </div>
          <div className="ml-auto mt-[10px]">
            <TestPictureButton setPicture={setThumbnail} />
          </div>
        </div>
        <div className="my-[10px]">
          <TextField
            fullWidth
            label="테스트를 설명해주세요"
            id="fullWidth"
            multiline
            rows={4}
            variant="filled"
            value={content}
            onChange={onChangeContent}
          />
        </div>
        <TestCaregory onCategoryChange={handleCategoryChange} />
        <div>
          <TestInputGroup />
        </div>

        <Button type="submit" primary fullWidth>
          테스트 만들기 완성
        </Button>
      </div>
    </form>
  );
};
export default Page;
