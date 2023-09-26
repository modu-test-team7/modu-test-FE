import React from 'react';

interface MypageButtonProps {
  type: 'button';
  onClick?: () => void;
  className?: string;
  label: string;

const MypageButton: React.FC<MypageButtonProps> = ({
  label,
  type = 'button',
  onClick,
  className,
}) => {
  const buttonStyle = `
    w-32 ml-5 p-2 rounded-xl transition duration-300 ease-in-out hover:bg-[#11B767] z-30 bg-[#ffffff]
  `;
  return (
    <button onClick={onClick} className={buttonStyle}>
      {label}
    </button>
  );
};

export default MypageButton;
