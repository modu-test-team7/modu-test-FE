import { Tester } from '@/type/Card';
import React, { useState, useEffect } from 'react';
import { Button } from '../button';
import Checkbox from '@mui/material/Checkbox';
import { getAPI } from '@/axios';
import { BsCheckLg } from 'react-icons/bs';

type TestDoitProps = {
  paramsId: number;
};

const TestDoit: React.FC<TestDoitProps> = ({ paramsId }) => {
  const [test, setTest] = useState<Tester>();
  const [userCheck, setUserCheck] = useState(false);
  const [score, setScore] = useState(0);

  const onChnageUserCheck = (choiceScore: number) => {
    setScore(score+choiceScore)
  };

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
    <div className="w-full min-h-[50px] mt-[50px] bg-gray-200 col gap-10">
      {test?.questions.map((question: string, qIndex) => {
        return (
          <div key={qIndex} className="bg-orange-100">
            <div>{question.title}</div>

            {question?.choices?.map((choice: string, cIndex: number) => {
              return (
                <div key={cIndex} className="row">
                  <Checkbox
                    onClick={() => {
                      if (choice.isCorrect) {
                        onChnageUserCheck(1)
                      }
                      }}
                    icon={<BsCheckLg />}
                    checkedIcon={<BsCheckLg />}
                    checked={choice.userChoice}
                  />
                  <div>{choice.content}</div>
                  {choice.isCorrect ? 'true' : 'false'}
                </div>
              );
            })}

            <div>
              {/* <div><Checkbox  icon={<BsCheckLg />} checkedIcon={<BsCheckLg />}/></div> */}
            </div>
          </div>
        );
      })}

      <Button primary fullWidth>
        결과보기
      </Button>
      <button onClick={() => console.log(test?.questions)}>데이터보기</button>
    </div>
  );
};

export default TestDoit;
