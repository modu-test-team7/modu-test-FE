import React from 'react';

interface MypageButtonProps {
  type?: 'button';
  onClick?: () => void;
  className?: string;
  label: string;
  isActive?: boolean;
}

const MypageButton: React.FC<MypageButtonProps> = ({ label, onClick, isActive }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 ml-4 rounded transition ease-in-out duration-300 ${
        isActive ? 'bg-green-500' : 'bg-white'
      }`}
    >
      {label}
    </button>
  );
};

export default MypageButton;
