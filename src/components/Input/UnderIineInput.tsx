import React, { ChangeEvent } from 'react';
type TestInputProps = {
  label?: string;
  value: string;
  setValue: (value: string) => void;
  name?: string;
};

const TestInput: React.FC<TestInputProps> = ({ label, value, setValue, name }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="div all">
      <input
        type="text"
        value={value}
        onChange={e => onChangeHandler(e)}
        required
        className="all input"
        name={name}
      />
      <label className="all label">{label}</label>
      <span className="all span"></span>
    </div>
  );
};
export default TestInput;
