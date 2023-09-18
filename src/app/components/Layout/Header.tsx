import React from 'react';
import Image from 'next/image';
import { BiSearchAlt } from 'react-icons/bi';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="w-full fixed top-0 z-50 h-[80px] shadow-bottom flex flex-row items-center justify-around">
      <div className="w-[--w-1200] flex flex-row items-center justify-between">
        <div className="relative h-[50px] w-[150px] flex-shrink-0 my-auto">
          <Image
            src="/lib/images/logo_clear.png"
            alt="logo"
            layout="fill"
            objectFit="contain" // 또는 'cover'
          />
        </div>
        <div className="flex flex-row item-center justify-center">
          <div className="search-container">
            <input type="text" className="search-input" placeholder="Search..." />
            <button className=""><BiSearchAlt /></button>
          </div>
          <div> 로그인 | 회원가입 </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
