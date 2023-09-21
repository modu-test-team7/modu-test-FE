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
    <div className="w-full relative top-0 z-50 h-[60px] shadow-bottom flex flex-row items-center justify-around bg-white">
      <div className="w-[1200px] flex flex-row items-center justify-between">
        <Link href="/">
          <Image
            src="/lib/images/logo_clear.png"
            alt="logo"
            height={30}
            width={80}
          />
        </Link>

        <div className="flex flex-row items-center justify-cente">
          <div className="text-sm relative" onClick={onClickDropdown}>
            <Link href="signup">
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
