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

  const [formData, setFormData] = useState({
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
  });

  const updateChoice = (qIndex: number, cIndex: number, newContent: string) => {
    setFormData(prevFormData => {
      const copyPrev = { ...prevFormData };
      const { questions } = copyPrev;
      questions[qIndex].choices[cIndex].content = newContent;
      return { ...prevFormData, questions };
      });
  };

  const updateChoiceCorrect = (qIndex: number, cIndex: number, curIsCorrect: boolean) => {
    setFormData(prevFormData => {
      const copyPrev = { ...prevFormData };
      const { questions } = copyPrev;
      questions[qIndex].choices[cIndex].isCorrect = !curIsCorrect;
      return { ...prevFormData, questions };
      });
  };


  const addChoice = (qIndex: number) => {
    setFormData(prevFormData => {
      const newQuestions = _.cloneDeep(prevFormData.questions);
      newQuestions[qIndex].choices.push({ content: '', isCorrect: false });
      return { ...prevFormData, questions: newQuestions };
    });
  };

  const removeChoice = (qIndex: number, cIndex: number) => {
    setFormData(prevFormData => {
      const newQuestions = _.cloneDeep(prevFormData.questions);
      if (newQuestions[qIndex]?.choices.length > 1) {
        _.pullAt(newQuestions[qIndex].choices, cIndex);
        return { ...prevFormData, questions: newQuestions };
      }
      return prevFormData;
    });
  };

  const updateQuestion = (qIndex: number, title: string) => {
    setFormData(prevFormData => {
      const updatedQuestions = [ ...prevFormData.questions ];
      updatedQuestions[qIndex].title = title;
      return { ...prevFormData, questions: updatedQuestions };
      });
  };

  const addQuestion = () => {
    setFormData(prevFormData => {
      const newQuestions = _.cloneDeep(prevFormData.questions);
      newQuestions.push({ title: '', image: '', choices: [{ content: '', isCorrect: false }] });
      return { ...prevFormData, questions: newQuestions };
    });
  };

  const removeQuestion = (qIndex: number) => {
    setFormData(prevFormData => {
      const newQuestions = [...prevFormData.questions];
      if (newQuestions.length > 1) {
        newQuestions.splice(qIndex, 1);
        return { ...prevFormData, questions: newQuestions };
      }
      return prevFormData;
    });
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const updateQuestionImage = (questionId: number, newImage: string) => {
    setFormData(prevFormData => {
      const updatedQuestions = [...prevFormData.questions]; // 배열 복사!
      updatedQuestions[questionId].image = newImage; // image 업데이트!
      return { ...prevFormData, questions: updatedQuestions }; // 최종 formData 업데이트!
    });
  };

  const onChangeTestContent = (e: ChangeEvent<HTMLInputElement>) => {
    updateFormData('content', e.target.value);
  };

  const onChangeCategory = (category: string) => {
    updateFormData('category', category);
  };

  const handleSubmit = async () => {
    try {
      console.log('=================formData' , formData)
      const response = await postAPI(`/api/test/testMake`, {
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

  useEffect(() => {
    // 페이지 이동 후 자동으로 (0, 0) 위치 보여줌
    window.scrollTo(0, 0);
  }, []);

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
            choiceValue={formData.questions.map(q => q.choices)}
            addQuestion={addQuestion}
            removeQuestion={removeQuestion}
            updateQuestion={updateQuestion}
            updateChoice={updateChoice}
            addChoice={addChoice}
            removeChoice={removeChoice}
            updateQuestionImage={updateQuestionImage}
            updateChoiceCorrect={updateChoiceCorrect}
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