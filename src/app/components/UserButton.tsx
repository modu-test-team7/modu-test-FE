"use client";

import React from 'react';
import Button from '@mui/material/Button';
import clsx from "clsx";

type UserButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean; //true일 경우 버튼의 너비가 부모 요소를 꽉채움
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean; // true일 경우 버튼에 보조 스타일이 적용된다
  danger?: boolean;
  disabled?: boolean; // true일 경우 비활성화
};

const UserButton: React.FC<UserButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        "flex justify-center rounded-md px-3 py-2 text-[13px] font-semibold focus-vidible:outline focus-visible:outline-3 focus-visible:outline-offset-2 transition-all",
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger && "bg-rose-600 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary && !danger && "bg-sky-200 hover:bg-sky-600 focus-visible:outline-sky-600"
      )}
    >
      {children}
    </button>
  );
};
export default UserButton;
