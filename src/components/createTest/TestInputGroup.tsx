import React from 'react';
import { useState, ChangeEvent } from 'react';
import { AiOutlineDelete, AiOutlineSmile, AiOutlinePlus } from 'react-icons/ai';
import { useTestStore } from '../../store/testStore';
import { TestThumbnail, TestInput, TestPictureButton } from '.';

type TestInputGroupProps = {};

const TestInputGroup: React.FC<TestInputGroupProps> = () => {
  const [questionPicture, setQuestionPicture] = useState('');

  const {
    questions,
    addQuestion,
    removeQuestion,
    addOption,
    removeOption,
    updateQuestion,
    updateOption,
  } = useTestStore();

  const handleQuestionChange = (qIndex: number, e: ChangeEvent<HTMLInputElement>) => {
    updateQuestion(qIndex, e.target.value);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, e: ChangeEvent<HTMLInputElement>) => {
    updateOption(qIndex, oIndex, e.target.value);
  };

  return (
    <div>
      {questions.map((q, qIndex) => (
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
                <TestPictureButton small setPicture={setQuestionPicture} />
              </div>
              <button type="button" onClick={removeQuestion}>
                <AiOutlineDelete size={25} className="ml-[5px]" />
              </button>
            </div>
          </div>

          {/* 질문 사진 */}
          <div className="mx-auto max-w-[500px] rounded-lg mb-[10px]">
            <TestThumbnail picture={questionPicture} />
          </div>
          <TestInput
            value={q.question}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuestionChange(qIndex, e)}
          />

          {/* 선택지 */}
          {q.options.map((o, oIndex) => (
            <div key={oIndex}>
              <TestInput
                optionInput
                value={o}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOptionChange(qIndex, oIndex, e)
                }
                plusButton={() => addOption(qIndex)}
                deleteButton={() => removeOption(qIndex)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TestInputGroup;
