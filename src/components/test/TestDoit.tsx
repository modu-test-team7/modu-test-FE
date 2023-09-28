import { Tester } from '@/type/Card';
import React, { useState, useEffect } from 'react';
import { Button } from '../button';
import Checkbox from '@mui/material/Checkbox';
import { getAPI } from '@/config/axios';
import { BsCheckLg } from 'react-icons/bs';
import { toast } from 'sonner';
import { AiTwotoneStar } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { postAPI } from '@/config/axios';

type TestDoitProps = {
  paramsId: number;
};

const TestDoit: React.FC<TestDoitProps> = ({ paramsId }) => {
  const [test, setTest] = useState<Tester>();
  const [score, setScore] = useState(0);
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, Record<number, boolean>>>(
    {},
  );

  const router = useRouter();
  const onChnageUserCheck = (qIndex: number, choiceId: number, isCorrect: boolean) => {
    const isChecked = checkedQuestions[qIndex]
      ? checkedQuestions[qIndex][choiceId] || false
      : false;
    let newScore = score;
    let scoreArray = [];

    // 점수 업데이트
    if (isCorrect) {
      newScore = isChecked ? score - 1 : score + 1;
    }

    // 체크 상태 업데이트
    setCheckedQuestions({
      ...checkedQuestions,
      [qIndex]: {
        ...checkedQuestions[qIndex],
        [choiceId]: !isChecked,
      },
    });

    // 점수 상태 업데이트
    setScore(newScore);
  };

  const saveTestResult = async () => {
    let isValid = true;

    Object.keys(checkedQuestions).forEach(qIndex => {
      const checkedChoices = checkedQuestions[Number(qIndex)];
      const count = Object.values(checkedChoices).filter(Boolean).length;
      console.log('checkedChoices', checkedChoices);

      // if (count === 0) {
      //   toast.error(`질문 ${Number(qIndex) + 1} 선택지 체크를 다 하셨나요?`);
      //   isValid = false;
      //   return;
      // }

      if (count > 1) {
        toast.error(`질문 ${Number(qIndex) + 1}에 여러 선택지를 선택하셨어요!`);
        isValid = false;
        return;
      }
    });

    if (isValid) {
      toast.success(`테스트 완료`);
      router.push(`/test-result/${test?.testerId}`);
    }

    try {
      const response = await postAPI(`/api/participate/${test?.testerId}`, {});
      toast.message('테스트 완료😊');
      console.log('성공:', response);
      return router.push('/'); // 또는 다른 페이지로 리다이렉트
    } catch (error) {
      toast.message('실패하였습니다🥲');
      console.log('에러:', error);
    }
  };

  console.log(test);

  useEffect(() => {
    const fetchTestCards = async () => {
      try {
        window.scrollTo(0, 0);
        const { data } = await getAPI(`/api/test/${paramsId}`);
        setTest(data);
      } catch (error) {
        console.error('데이터를 가져오는데 에러가 발생했어:', error);
      }
    };

    fetchTestCards();
  }, [paramsId]);

  return (
    <div className="w-full min-h-[50px] mt-[50px] col gap-10">
      {test?.questions.map((question, qIndex: number) => {
        return (
          <div key={qIndex} className="cursor-default">
            <div className="row items-center justify-start gap-1 mb-[15px]">
              <AiTwotoneStar color="gray" size={15} />
              <div className="text-lg font-bold text-gray-500 ">{question.title}</div>
            </div>

            <div className="col gap-2 w-full">
              {question?.choices?.map((choice, cIndex: number) => {
                return (
                  <div
                    key={cIndex}
                    className="row items-center justify-start hover:shadow-md rounded-md text-gray-500 hover:font-bold p-[2px]"
                  >
                    <Checkbox
                      onClick={() => onChnageUserCheck(qIndex, cIndex, choice.isCorrect)}
                      icon={<BsCheckLg />}
                      checkedIcon={<BsCheckLg />}
                    />
                    <div className="text-md ">{choice.content}</div>
                    {choice.isCorrect ? `___true` : `___false`}
                  </div>
                );
              })}
            </div>

            <div>
              {/* <div><Checkbox  icon={<BsCheckLg />} checkedIcon={<BsCheckLg />}/></div> */}
            </div>
          </div>
        );
      })}

      <Button type="button" primary fullWidth onClick={saveTestResult}>
        결과보기
      </Button>
    </div>
  );
};

export default TestDoit;
