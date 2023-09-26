import { Tester } from '@/type/Card';
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Button } from '../button';
import Checkbox from '@mui/material/Checkbox';

type TestDoitProps = {
  paramsId: number
};

const TestDoit:React.FC<TestDoitProps> = ({paramsId}) => {
  const [test, setTest] = useState<Tester>();
  useEffect(() => {

    const fetchTestCards = async () => {
      try {
        window.scrollTo(0, 0);
        const { data } = await axios.get(`http://13.125.200.12/api/test/${paramsId}`);
        setTest(data);
      } catch (error) {
        console.error('데이터를 가져오는데 에러가 발생했어:', error);
      }
    };

    fetchTestCards();
  }, []);

  return (

  <div className='w-full min-h-[50px] mt-[50px] bg-gray-200'>
    <div>
      테스트 질문 1 {test?.title}
    </div>
    <div>
      {/* <div><Checkbox  icon={<BsCheckLg />} checkedIcon={<BsCheckLg />}/></div> */}
      선택지 1
      </div>
    <div>선택지 2</div>
    <div>선택지 3</div>
    <Button primary fullWidth>결과보기</Button>
    
  </div>
    
  )
}

export default TestDoit;