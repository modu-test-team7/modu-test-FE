import React from 'react';
import { useState } from 'react';
import TestInput from './TestInput';
import {
  AiOutlineDelete,
  AiOutlinePicture,
  AiOutlinePlus,
} from 'react-icons/ai';

type TestInputGroupProps = {};

const TestInputGroup: React.FC<TestInputGroupProps> = () => {
  const [questionCount, setQuestionCount] = useState(2);
  const [testOption, setTestOption] = useState(2);

  const QuestionPlusButtonHandler = () => {
    setQuestionCount(questionCount + 1);
  };

  const PictureButtonHandler = () => {
    setQuestionCount(questionCount + 1);
  };

  const DeleteButtonHandler = () => {
    setQuestionCount(questionCount - 1);
  };

  const OptionPlusButtonHandler = () => {
    setTestOption(testOption + 1);
  };

  const OptionDeleteButtonHandler = () => {
    setTestOption(testOption - 1);
  };

  return (
    <div>
      {Array.from({ length: questionCount }, (_, i) => i).map((_, i) => {
        return (
          <div key={i} className="mb-[60px]">
            <div className="flex flex-row items-center justify-between">
              <div className="text-gray-500 text-md my-[5px]">
                {i + 1}번째 질문
              </div>
              <div className="text-gray-500 flex flex-row items-center justify-end">
                <button type="button" onClick={QuestionPlusButtonHandler}>
                  <AiOutlinePlus size={25} className="ml-[5px]" />
                </button>
                <button type="button" onClick={QuestionPlusButtonHandler}>
                  <AiOutlinePicture size={25} className="ml-[5px]" />
                </button>
                <button type="button" onClick={DeleteButtonHandler}>
                  <AiOutlineDelete size={25} className="ml-[5px]" />
                </button>
              </div>
            </div>

            <TestInput />
            {Array.from({ length: testOption }, (_, i) => i).map((_, i) => {
              return (
                <div key={i}>
                  <TestInput optionInput optionCount plusButton={OptionPlusButtonHandler} deleteButton={OptionDeleteButtonHandler}/>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default TestInputGroup;
