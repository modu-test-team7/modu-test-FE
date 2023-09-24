import React, { useState, ChangeEvent, SetStateAction } from 'react';
import { AiOutlineDelete, AiOutlineSmile, AiOutlinePlus } from 'react-icons/ai';
import { TestThumbnail, TestInput, TestPictureButton } from '.';
import { Choice, Questions } from '@/type/Card';
import { useTestStore } from '../../store/testStore';

type TestInputGroupProps = {
  questionValue: any;
  choiceValue: any;
  setTitleValue?: (value: string) => void;
  name?: string;
  addQuestion: () => void;
  removeQuestion: () => void;
  updateQuestion: (qIndex: number, newQuestion: string) => void;
  updateChoice: (qIndex: number, cIndex: number, newChoice: string) => void;
  addChoice: (qIndex: number) => void;
  removeChoice: (qIndex: number, cIndex: number) => void;
  updateQuestionImage: (qIndex: number, newImage: string) => void;
};

const TestInputGroup: React.FC<TestInputGroupProps> = ({
  questionValue,
  setTitleValue,
  name,
  addQuestion,
  removeQuestion,
  updateQuestion,
  updateChoice,
  addChoice,
  removeChoice,
  updateQuestionImage,
}) => {

  const onChangeQuestion = (qIndex: number, e: ChangeEvent<HTMLInputElement>) => {
    updateQuestion(qIndex, e.target.value);
  };

  const onChangeChoice = (qIndex: number, cIndex: number, e: ChangeEvent<HTMLInputElement>) => {
    updateChoice(qIndex, cIndex, e.target.value);
  };

  const changeQuestionPicture = (qIndex: number, newImage: string) => {
    updateQuestionImage(qIndex, newImage)
  }  


  console.log(questionValue);
  return (
    <div>
      {questionValue.map((question: Questions, qIndex: number) => (
        <div key={qIndex} className="mb-[30px]">
          <div className="flex flex-row items-center justify-between">
            <div className="text-gray-500 text-md my-[5px] row items-center gap-2">
              <AiOutlineSmile color="orange" size={20} />
              {qIndex + 1}번째 질문
            </div>

            {/* 질문 버튼들 */}
            <div className="text-gray-500 flex flex-row items-center justify-end">
              <button type="button" onClick={addQuestion}>
                <AiOutlinePlus size={25} className="ml-[5px]" />
              </button>
              <div className="ml-auto mt-[10px]">
              <TestPictureButton small questionId={question.id} setImage={changeQuestionPicture} />
              </div>
              <button type="button" onClick={removeQuestion}>
                <AiOutlineDelete size={25} className="ml-[5px]" />
              </button>
            </div>
          </div>

          {/* 질문 사진 */}
          <div className="mx-auto max-w-[500px] rounded-lg mb-[10px]">
            <TestThumbnail image={question.image} />
          </div>
          <TestInput
            value={question.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeQuestion(qIndex, e)}
          />

          {/* 선택지 */}
          {question.choices.map((choice: Choice, cIndex: number) => (
            <div key={cIndex}>
              <TestInput
                optionInput
                value={choice.content}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChangeChoice(qIndex, cIndex, e)
                }
                plusButton={() => addChoice(qIndex)}
                deleteButton={() => removeChoice(qIndex, cIndex)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TestInputGroup;
