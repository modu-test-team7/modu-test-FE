'use client';

import React from 'react';
import TestTitleInput from '@/components/createTest/TestTitleInput';
import TestInput from '@/components/createTest/TestInput';

type TestResultProps = {};

const TestResult: React.FC<TestResultProps> = () => {
  return (
    <div>
      <div>
        <TestTitleInput label="결과명을 적어주세요" />
        <TestInput testResult></TestInput>
      </div>
    </div>
  );
};
export default TestResult;
