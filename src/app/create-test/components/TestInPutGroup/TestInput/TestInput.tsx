import React, { SetStateAction } from 'react';
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
  value?: string;
  onChange?: any;
  setFormData?: React.Dispatch<SetStateAction<CreateTest>>;
  qIndex?: any;
  cIndex?: number;
  // isCorrect?:boolean;
  // onChnageCheckbox?:(value:boolean)=>void
};

const TestInput: React.FC<TestInputProps> = ({
  plusButton,
  deleteButton,
  optionInput,
  optionCount,
  testResult,
  value,
  onChange,
  setFormData,
  qIndex,
  cIndex,
  // isCorrect,
  // onChnageCheckbox,
}) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  // 선택지 +
  const addChoice = (qIndex: number) => {
    console.log('addChoice');
    setFormData?.(prevFormData => {
      const updatedQuestions = [...prevFormData.questions];

      const newChoice = {
        content: '',
        isCorrect: false,
      };

      updatedQuestions[qIndex].choices = [...updatedQuestions[qIndex].choices, newChoice];

      // 업데이트된 질문 리스트로 전체 데이터 업데이트
      return { ...prevFormData, questions: updatedQuestions };
    });
  };

  // 선택지 -
  // const removeChoice = (qIndex: number, cIndex: number) => {
  //   setFormData?.(prevFormData => {
  //     const prevQ = [...prevFormData.questions].filter((_, idx) => qIndex !== idx);
  //     return { ...prevFormData, questions: prevQ };
  //   });
  // };

  // 선택지 -
  const removeChoice = (qIndex: number, cIndex: number) => {
    setFormData?.(prevFormData => {
      // 현재 질문 리스트 복사
      const updatedQuestions = [...prevFormData.questions];

      // 해당 질문에서 선택지 리스트 복사
      const updatedChoices = { ...updatedQuestions[qIndex].choices };

      // 선택지 삭제
      const prevC = [...prevFormData.questions].filter((_, idx) => qIndex !== idx);

      // 업데이트된 선택지로 해당 질문 업데이트
      updatedQuestions[qIndex].choices = updatedChoices;

      // 업데이트된 질문 리스트로 전체 데이터 업데이트
      return { ...prevFormData, questions: updatedQuestions };
    });
  };

  // 선택지 저장
  const onChangeChoice = (qIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData?.(prevFormData => {
      const updatedQuestions = { ...prevFormData.questions };
      updatedQuestions[qIndex].title = e.target.value;
      return { ...prevFormData, questions: updatedQuestions };
    });
  };

  const updateChoice = (qIndex: number, cIndex: number, newContent: string) => {
    setFormData?.(prevFormData => {
      const copyPrev = { ...prevFormData };
      const { questions } = copyPrev;
      questions[qIndex].choices[cIndex].content = newContent;
      return { ...prevFormData, questions };
    });
  };

  const updateChoiceCorrect = (qIndex: number, cIndex: number, curIsCorrect: boolean) => {
    setFormData?.(prevFormData => {
      const copyPrev = { ...prevFormData };
      const { questions } = copyPrev;
      questions[qIndex].choices[cIndex].isCorrect = !curIsCorrect;
      return { ...prevFormData, questions };
    });
  };

  return (
    <div
      className={clsx(
        'bg-blue-50 h-[50px] flex flex-row justify-between items-center rounded-md px-[20px]',
        optionInput ? 'mb-[5px]' : 'mb-[15px]',
      )}
    >
      {/* {optionInput && (
        <Checkbox
          onChange={() => {
            onChnageCheckbox && onChnageCheckbox(!!isCorrect);
          }}
          {...label}
          icon={<BsCheckLg />}
          checkedIcon={<BsCheckLg />}
          checked={isCorrect}
        />
      )} */}
      <input
        placeholder={optionInput ? '선택지를 입력 해 주세요' : '질문을 입력 해 주세요'}
        className="bg-transparent w-[900px] focus:outline-none text-sm text-gray-900"
        value={value}
        onChange={onChange}
      />
      {optionInput && (
        <div className="text-gray-500 flex flex-row items-center justify-end">
          <button type="button">
            <AiOutlinePlus onClick={() => addChoice(qIndex)} />
          </button>
          <button type="button">
            <FiX className="ml-[5px]" onClick={removeChoice} />
          </button>
        </div>
      )}
    </div>
  );
};
export default TestInput;
