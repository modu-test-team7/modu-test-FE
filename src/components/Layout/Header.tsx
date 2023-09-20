'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import HeaderDropdown from '../HeaderDropdown';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

  const onClickDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full fixed top-0 z-50 h-[60px] shadow-bottom flex flex-row items-center justify-around">
      <div className="w-[--w-1200] flex flex-row items-center justify-between">
        <Link
          href="/"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lib/images/logo_clear.png"
            alt="logo"
            className="relative h-[30px] w-[80px] flex-shrink-0 my-auto"
          />
        </Link>
        <div className="flex flex-row items-center justify-cente">
          <div className="text-sm relative" onClick={onClickDropdown}>
            <Link href="login">
              <FiUser size={20} />
            </Link>
            {isDropdownOpen && <HeaderDropdown />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
