'use client';

import React, { ChangeEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { TextField } from '@mui/material';
import { toast } from 'sonner';

import { Button } from '@/components/button';
import UnderLineInput from '@/components/Input/UnderIineInput';
import { TestCategory, TestThumbnail, TestThumbnailButton } from './components/'
import TestInputGroup from './components/TestInPutGroup/TestInputGroup';
import _ from 'lodash';
import { postAPI } from '@/axios';

const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<CreateTest>({
    title: '',
    content: '',
    image: '',
    category: '',
    questions: [
      {
        title: '',
        image: '',
        choices: [
          {
            content: '',
            isCorrect: false,
          },
        ],
      },
    ],
    results: [
      {
        image: '',
        content: '',
        score: 0,
      },
    ],
    comments: [],
  });

  const updateFormData = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const onChangeTestContent = (e: ChangeEvent<HTMLInputElement>) => {
    updateFormData('content', e.target.value);
  };

  const onChangeCategory = (category: string) => {
    updateFormData('category', category);
  };

  const handleSubmit = async () => {
    const isEmptyQuestion = formData.questions.some(
      (q) => !q.title.trim() || q.choices.some((c) => !c.content.trim())
    );
  
    if (isEmptyQuestion) {
      toast.error('질문 또는 선택지를 모두 입력 해 주세요');
      return; // 여기서 함수를 종료함
    }

    try {
      const response = await postAPI(`/api/test/testsMake`, {
        ...formData,
      });
      toast.message('테스트가 만들기 성공😊');
      console.log('성공:', response);
      return router.push('/'); // 또는 다른 페이지로 리다이렉트
    } catch (error) {
      toast.message('실패하였습니다🥲');
      console.log('에러:', error);
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="w-[800px] h-[100%] mx-auto pt-[20px] flex flex-col justify-center my-[50px]">
        <div className="h-[60px] mt-[50px] text-sm">
          <UnderLineInput
            label="테스트 제목을 적어주세요"
            value={formData.title}
            setValue={value => updateFormData('title', value)}
            name="testTitle"
          />
        </div>

        <div className="flex w-full flex-col justify-center items-center">
          <div className="w-full rounded-lg">
            <TestThumbnail image={formData.image} />
          </div>
          <div className="ml-auto mt-[10px]">
            <TestThumbnailButton setImage={value => updateFormData('image', value)} />
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
            value={formData.content}
            onChange={onChangeTestContent}
          />
        </div>
        <TestCategory onCategoryChange={onChangeCategory} />
        <div>
          <TestInputGroup
            questionValue={formData.questions}
            setFormData={setFormData}
          />
        </div>

        <Button type="submit" primary fullWidth>
          테스트 만들기 완성
        </Button>
      </div>
    </form>
  );
};
export default Page;