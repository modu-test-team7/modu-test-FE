import React from 'react';
import { IconBaseProps } from 'react-icons';

type OAuthButtonProps = {
  onClick?: () => void;
  icon: React.ComponentType<IconBaseProps>;
  children?: React.ReactNode;
  isKakao?: boolean; // isKakao 속성을 추가합니다.
};

const OAuthButton: React.FC<OAuthButtonProps> = ({
  icon: Icon,
  onClick,
  children,
  isKakao = false, // 기본값을 false로 설정합니다.
}) => {
  const buttonClassNames = `
    mt-4
    text-sm
    inline-flex 
    w-full 
    justify-center 
    flex-row
    items-center
    rounded-lg
    border-gray-100
    h-[40px]
    text-gray-900 
    font-bold
    ${
      isKakao
        ? 'bg-yellow-300 hover:bg-yellow-400'
        : 'bg-gray-300 hover:bg-gray-400'
    } 
  `;

  return (
    <button type="button" onClick={onClick} className={buttonClassNames}>
      {children}
      <Icon size={20} className="ml-[5px]" />
    </button>
  );
};

export default OAuthButton;
