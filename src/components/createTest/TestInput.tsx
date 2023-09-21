import React from 'react';
import { FiX } from 'react-icons/fi';
import Checkbox from '@mui/material/Checkbox';
import { BsCheckLg } from 'react-icons/bs';
import clsx from 'clsx';
import { AiOutlinePlus } from 'react-icons/ai';

type TestInputProps = {
  optionInput?: boolean;
  optionCount?: boolean;
  plusButton?: () => void;
  deleteButton?: () => void;
  testResult?: boolean;
};



const TestInput: React.FC<TestInputProps> = ({ plusButton, deleteButton, optionInput, optionCount, testResult }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
  return (
    <div
      className={clsx(
        'bg-blue-50 h-[50px] flex flex-row justify-between items-center rounded-md px-[20px]',
        optionInput ? 'mb-[5px]' : 'mb-[15px]'
      )}
    >
      {optionInput && (
        <Checkbox {...label} icon={<BsCheckLg />} checkedIcon={<BsCheckLg />} />
      )}
      <input
        placeholder={
          optionInput ? '선택지를 입력 해 주세요' : testResult ? '결과를 설명해주세요' : '질문을 입력 해 주세요'
        }
        className="bg-transparent w-[900px] focus:outline-none text-sm text-gray-900"
      />
      {optionInput && (
        <div className="text-gray-500 flex flex-row items-center justify-end">
          <button type="button">
            <AiOutlinePlus className="ml-[5px]" onClick={plusButton}/>
          </button>
          <button>
            <FiX className="text-gray-500" onClick={deleteButton}/>
          </button>
        </div>
      )}
    </div>
  );
};
export default TestInput;