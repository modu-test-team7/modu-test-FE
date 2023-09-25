import { Tester } from '@/type/Card';
import React from 'react';

type TestDoitProps = {
  test: Tester
};

const TestDoit:React.FC<TestDoitProps> = (test) => {
  return (
  <div className='w-full min-h-[50px] mt-[50px] bg-gray-200'>
    {/* {test} */}
  </div>
  )
}
export default TestDoit;