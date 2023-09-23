import React, { ChangeEvent } from 'react';

type TestInputProps = {
  label?: string;
  value: string;
  setValue: (value:string) => void;
};

const TestInput: React.FC<TestInputProps> = ({ label, value, setValue }) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className="div all">
      <input
        type="text"
        value={value} 
        onChange={(e) =>  onChangeHandler(e)}
        required
        className="all input"
      />
      <label className="all label">{label}</label>
      <span className="all span"></span>
    </div>
  );
};
export default TestInput;
