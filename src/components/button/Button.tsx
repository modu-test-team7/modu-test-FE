import React from 'react';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import { IconType } from 'react-icons';

type TestButtonProps = {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  secondary?: boolean;
  primary?: boolean;
  danger?: boolean;
  fullWidth?: boolean;
  icon?: IconType;
  disabled?: boolean;
};

const TestButton: React.FC<TestButtonProps> = ({
  children,
  type,
  onClick,
  secondary,
  primary,
  danger,
  fullWidth,
  icon: Icon,
  disabled,
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={clsx(
          'text-sm h-[40px] rounded-lg last:ml-[10px]',
          primary && ' bg-blue-200 hover:bg-blue-100 font-bold w-4/5',
          secondary && 'text-gray-500 bg-gray-200 hover:bg-gray-100 w-1/5',
          disabled && 'opacity-50 cursor-default',
          fullWidth && 'w-full',
          danger && 'bg-white ring-1 ring-red-500 text-red-500 hover:bg-red-500 hover:text-white'
        )}
      >
        <div className='w-full flex flex-row items-center justify-center relative'>
          {children}
          {Icon && <Icon className={clsx(children && "ml-[10px]" )} />}
        </div>
      </Button>
    </>
  );
};
export default TestButton;