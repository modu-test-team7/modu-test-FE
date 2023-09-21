import React from 'react';
import IconType from 'react-icons';

type OAuthButtonProps = {
  onClick?: () => void;
  icon: IconType;
  children?: React.ReactNode;
};

const OAuthButton: React.FC<OAuthButtonProps> = ({
  icon: Icon,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        text-sm
        inline-flex 
        w-full 
        justify-center 
        flex-row
        items-center
        rounded-md 
        border-gray-100
        h-[40px]
        bg-yellow-300 
        hover:bg-yellow-400
        text-gray-900 
        font-bold
         
      `}
    >
      {children}
      <Icon size={20} className="ml-[5px]" />
    </button>
  );
};
export default OAuthButton;
