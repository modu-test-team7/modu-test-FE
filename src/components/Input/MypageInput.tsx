import React, { ChangeEvent } from 'react';

interface InputProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  error?: boolean;
  helperText?: string | null | undefined;
  variant?: 'solid' | 'outlined';
}

const MypageInput: React.FC<InputProps> = ({
  value,
  onChange,
  inputProps,
  error,
  helperText,
  variant = 'solid',
}) => {
  return (
    <input // 이 부분이 수정된 부분입니다.
      value={value}
      onChange={onChange}
      {...inputProps}
      className={variant} // 예를 들어, variant를 className으로 사용
      aria-describedby={helperText ? 'helper-text' : undefined}
    />
  );
};

export default MypageInput;
