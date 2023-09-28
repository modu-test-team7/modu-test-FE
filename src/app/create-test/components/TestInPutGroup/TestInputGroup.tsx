import React, { SetStateAction } from 'react';
import { AiOutlineDelete, AiOutlinePlus, AiOutlineCheck, AiOutlineClose, AiTwotoneStar } from 'react-icons/ai';
import { Choice, Questions } from '@/type/Card';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'sonner';

type TestInputGroupProps = {
  questionValue: any;
  setFormData: React.Dispatch<SetStateAction<CreateTest>>;
};

const TestInputGroup: React.FC<TestInputGroupProps> = ({ questionValue, setFormData }) => {
  // 질문 +
  const addQuestion = () => {
    setFormData(prevFormData => {
      const addQ = {
        title: '',
        image: '',
        choices: [{ content: '', isCorrect: false }],
      };
      return { ...prevFormData, questions: [...prevFormData.questions, addQ] };
    });
  };

  // 질문 -
  const removeQuestion = (qIndex: number) => {
    setFormData(prevFormData => {
      const prevQ = [...prevFormData.questions].filter((_, idx) => qIndex !== idx);
      return { ...prevFormData, questions: prevQ };
    });
  };

  // 질문 Onchange
  const onChangeQuestion = (qIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevFormData => {
      const updatedQuestions = [...prevFormData.questions];
      updatedQuestions[qIndex].title = e.target.value;
      return { ...prevFormData, questions: updatedQuestions };
    });
  };

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

      return { ...prevFormData, questions: updatedQuestions };
    });
  };

  // 선택지 -
  const removeChoice = (qIndex: number, cIndex: number) => {
    setFormData?.(prevFormData => {
      const updatedQuestions = [...prevFormData.questions];

      updatedQuestions[qIndex].choices = updatedQuestions[qIndex].choices.filter(
        (_, index) => index !== cIndex,
      );

      return { ...prevFormData, questions: updatedQuestions };
    });
  };

  // 선택지 onChange
  const onChangeChoice = (
    qIndex: number,
    cIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData?.(prevFormData => {
      const updatedQuestions = [...prevFormData.questions];
      if (updatedQuestions[qIndex] && updatedQuestions[qIndex].choices[cIndex]) {
        updatedQuestions[qIndex].choices[cIndex].content = e.target.value;
      }
      return { ...prevFormData, questions: updatedQuestions };
    });
  };
 
  const onChnageCheckbox = (qIndex: number, cIndex: number, curIsCorrect: boolean) => {
    setFormData(prevFormData => {
      const copyPrev = { ...prevFormData };
      const { questions } = copyPrev;
      
      // 이미 체크된 선택지가 있는지 검사 !!! 두번째꺼 선택하면 기존꺼 체크 풀리게 해보기
      const alreadyChecked = questions[qIndex].choices.some((choice, index) => choice.isCorrect && index !== cIndex);
  
      if (alreadyChecked) {
        toast.error("하나의 질문에는 하나의 정답만 가능해요!")
        return prevFormData; // 상태를 변경하지 않고 그대로 반환
      }
  
      // 선택지 업데이트
      questions[qIndex].choices[cIndex].isCorrect = !curIsCorrect;
      return { ...prevFormData, questions };
    });
  };

  return (
    <div>
      {questionValue.map((question: Questions, qIndex: number) => (
        <div key={qIndex} className="mb-[30px]">
          <div className="flex flex-row items-center justify-between">
            <div className="text-gray-500 text-md my-[5px] row items-center justify-center gap-1">
              <AiTwotoneStar color="gray" size={15} />
              {qIndex + 1}번째 질문
            </div>

            {/* 질문 버튼들 */}
            <div className="text-gray-500 flex flex-row items-center justify-end">
              <button type="button" onClick={addQuestion}>
                <AiOutlinePlus size={25} className="ml-[5px]" />
              </button>

              <button type="button" onClick={() => removeQuestion(qIndex)}>
                <AiOutlineDelete size={25} className="ml-[5px]" />
              </button>
            </div>
          </div>

          <div className="bg-gray-100 shadow-lg h-[50px] flex flex-row justify-between items-center rounded-md px-[20px] mb-[15px]">
            <input
              placeholder="질문을 입력 해 주세요"
              className="bg-transparent w-[900px] focus:outline-none text-sm text-gray-900"
              value={question.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeQuestion(qIndex, e)}
            />
          </div>

          {/* 선택지 */}
          {question.choices.map((choice: Choice, cIndex: number) => (
            <div
              key={cIndex}
              className="bg-gray-100 shadow-md h-[50px] flex flex-row justify-between items-center rounded-md px-[20px] mb-[5px]"
            >
              <Checkbox
                onChange={() => onChnageCheckbox(qIndex, cIndex, choice.isCorrect)}
                icon={<AiOutlineCheck />}
                checkedIcon={<AiOutlineCheck color="skyblue"/>}
                checked={choice.isCorrect}
              />
              <input
                placeholder="선택지를 입력 해 주세요"
                className="bg-transparent w-[900px] focus:outline-none text-sm text-gray-900"
                value={choice.content}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChangeChoice(qIndex, cIndex, e)
                }
              />
              <div className="text-gray-500 flex flex-row items-center justify-end">
                <button type="button">
                  <AiOutlinePlus onClick={() => addChoice(qIndex)} />
                </button>
                <button type="button">
                  <AiOutlineClose className="ml-[5px]" onClick={() => removeChoice(qIndex, cIndex)} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TestInputGroup;
