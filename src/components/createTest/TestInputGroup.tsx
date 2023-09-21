import React from 'react';
import { useState, ChangeEvent  } from 'react';
import TestInput from './TestInput';
import {
  AiOutlineDelete,
  AiOutlinePicture,
  AiOutlinePlus,
} from 'react-icons/ai';
import useTestStore from '../../store/testStore'

type TestInputGroupProps = {};

const TestInputGroup: React.FC<TestInputGroupProps> = () => {

  const { questions, addQuestion, removeQuestion, addOption, removeOption, updateQuestion, updateOption } = useTestStore();
  
  const handleQuestionChange = (qIndex: number, e: ChangeEvent<HTMLInputElement>) => {
    updateQuestion(qIndex, e.target.value);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, e: ChangeEvent<HTMLInputElement>) => {
    updateOption(qIndex, oIndex, e.target.value);
  };

  return (
    <div>
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-[60px]">
          <div className="flex flex-row items-center justify-between">
            <div className="text-gray-500 text-md my-[5px]">
              {qIndex + 1}번째 질문
            </div>
            <div className="text-gray-500 flex flex-row items-center justify-end">
              <button type="button" onClick={addQuestion}>
                <AiOutlinePlus size={25} className="ml-[5px]" />
              </button>
              <button type="button">
                <AiOutlinePicture size={25} className="ml-[5px]" />
              </button>
              <button type="button" onClick={removeQuestion}>
                <AiOutlineDelete size={25} className="ml-[5px]" />
              </button>
            </div>
          </div>
          <TestInput
            value={q.question}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuestionChange(qIndex, e)}
          />
          {q.options.map((o, oIndex) => (
            <div key={oIndex}>
              <TestInput
                optionInput
                value={o}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOptionChange(qIndex, oIndex, e)}
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
