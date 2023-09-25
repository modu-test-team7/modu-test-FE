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
  value: string;
  onChange: any;
  // onClickCheckChoice: (qIndex: number, cIndex: number) => void;
};

const TestInput: React.FC<TestInputProps> = ({
  plusButton,
  deleteButton,
  optionInput,
  optionCount,
  testResult,
  value,
  onChange,
}) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div
      className={clsx(
        'bg-blue-50 h-[50px] flex flex-row justify-between items-center rounded-md px-[20px]',
        optionInput ? 'mb-[5px]' : 'mb-[15px]',
      )}
    >
      {optionInput && (
        <Checkbox
          {...label}
          icon={<BsCheckLg />}
          checkedIcon={<BsCheckLg />}
          // checked={question.choices[cIndex].isCorrect} // 이미 값이 true인지 false인지에 따라 체크박스 상태 결정
          // onClick={() => onClickCheckChoice(qIndex, cIndex)} // 이 부분 추가!

        />
      )}
      <input
        placeholder={optionInput ? '선택지를 입력 해 주세요' : '질문을 입력 해 주세요'}
        className="bg-transparent w-[900px] focus:outline-none text-sm text-gray-900"
        value={value}
        onChange={onChange}
      />
      {optionInput && (
        <div className="text-gray-500 flex flex-row items-center justify-end">
          <button type="button">
            <AiOutlinePlus onClick={plusButton} />
          </button>
          <button type="button">
            <FiX className="ml-[5px]" onClick={deleteButton} />
          </button>
        </div>
      )}
    </div>
  );
};
export default TestInput;
