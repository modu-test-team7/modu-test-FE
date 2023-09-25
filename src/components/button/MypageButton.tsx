import React from 'react';

interface MypageButtonProps {
  label: string;
  onClick?: () => void;
}

const MypageButton: React.FC<MypageButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-32 ml-5 p-2 rounded-xl transition duration-300 ease-in-out hover:bg-[#11B767] z-30 bg-[#ffffff]"
    >
      {label}
    </button>
  );
};

export default MypageButton;
