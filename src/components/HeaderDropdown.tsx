import Link from 'next/link';
import React from 'react';

type HeaderDropdownProps = {};

const HeaderDropdown: React.FC<HeaderDropdownProps> = () => {
  return (
    <div className="w-[120px] absolute z-50 shadow-md top-[50px] right-[-50px] flex flex-col items-center justify-start py-[20px] rounded-md">
      <div className='py-[5px] text-xs font-bold'>마이페이지</div>
      <div className='py-[5px] text-xs font-bold'>나의 테스트</div>
      <div className='py-[5px] text-xs font-bold'>참여 테스트</div>
      <div className='py-[5px] text-xs font-bold text-gray-600'>로그아웃</div>
    </div>
  );
};
export default HeaderDropdown;
