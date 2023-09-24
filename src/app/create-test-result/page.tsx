'use client';

import TestResult from '@/components/createTest/TestResult';
import React, { useState } from 'react';

type pageProps = {};

const Page: React.FC<pageProps> = () => {
  const [score, serScore] = useState(7);
  return (
    <div className="w-[800px] h-[100%] mx-auto pt-[20px] flex flex-col justify-center">
      {Array.from({ length: score }, (_, i) => i).map((_, i) => {
        return (
          <div key={i} className="mb-[40px]">
            <div className="text-sm text-gray-500">
              {i}점 이상 {i}점 이하
            </div>
            <TestResult />
          </div>
        );
      })}
    </div>
  );
};
export default Page;
