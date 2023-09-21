import React from 'react';

type TestInputProps = {
  label?: string;
};

const TestInput: React.FC<TestInputProps> = ({ label }) => {
  return (
    <div className="div all">
      <input type="text" required className="all input" />
      <label className="all label">{label}</label>
      <span className="all span"></span>
    </div>
  );
};
export default TestInput;
