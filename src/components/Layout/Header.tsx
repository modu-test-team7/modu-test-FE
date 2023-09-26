'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import HeaderDropdown from '../HeaderDropdown';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onClickDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // 외부 클릭을 감지하려면 이벤트 리스너를 추가
    window.addEventListener('click', handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full fixed top-0 z-50 h-[60px] shadow-bottom flex flex-row items-center justify-around bg-white">
      <div className="w-[1200px] flex flex-row items-center justify-between">
        <Link href="/">
          <Image src="/lib/images/logo_clear.png" alt="logo" height={30} width={80} />
        </Link>

        <div className="flex flex-row items-center justify-cente">
          <div className="text-sm relative cursor-pointer" onClick={onClickDropdown} ref={dropdownRef}>
            <FiUser size={20}/>
            {isDropdownOpen && <HeaderDropdown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
