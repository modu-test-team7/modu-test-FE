import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiSearchAlt } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';


type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="w-full fixed top-0 z-50 h-[60px] shadow-bottom flex flex-row items-center justify-around">
      <div className="w-[--w-1200] flex flex-row items-center justify-between">
        <Link href="/" className="relative h-[30px] w-[150px] flex-shrink-0 my-auto">
          <Image
            src="/lib/images/logo_clear.png"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </Link>
        <div className="flex flex-row items-center justify-cente">
          <div className="w-[200px] h-[40px] flex items-center justify-end mr-4 group ">
            <div className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center overflow-hidden transition-all duration-300 ease-in-out group-hover:w-full group-hover:rounded-[25px] focus-keep-size">
              <input
                type="text"
                className="flex-grow-0 w-0 h-full text-xs rounded-md box-border transition-all duration-300 ease-in-out border-none outline-none bg-transparent group-hover:pl-5 group-hover:w-[100%] group-hover:flex-grow hover:ml-0 focus:outline-none focus-keep-input"
                placeholder="Search..."
              />
              <button className="w-[50px] flex items-center justify-center">
                <BiSearchAlt size={20} />
              </button>
            </div>
          </div>
          <Link href="" className="text-sm"> <FiUser size={20}/> </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
