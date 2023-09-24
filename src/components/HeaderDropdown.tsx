import Link from 'next/link';
import React from 'react';
import Cookies from 'js-cookie';

type HeaderDropdownProps = {};

const HeaderDropdown: React.FC<HeaderDropdownProps> = () => {
  // accessToken의 존재 여부를 확인합니다.
  const isLogged = Boolean(Cookies.get('accessToken'));

  return (
    <div className="w-[120px] absolute z-50 shadow-md top-[50px] right-[-50px] flex flex-col items-center justify-start py-[20px] rounded-md">
      <Link href="/mypage">
        <div className="py-[5px] text-xs font-bold">마이페이지</div>
      </Link>
      <div className="py-[5px] text-xs font-bold">나의 테스트</div>
      <div className="py-[5px] text-xs font-bold">참여 테스트</div>
      {isLogged ? (
        <Link href="/logout">
          <div className="py-[5px] text-xs font-bold text-gray-600">로그아웃</div>
        </Link>
      ) : (
        <Link href="/login">
          <div className="py-[5px] text-xs font-bold text-gray-600">로그인</div>
        </Link>
      )}
    </div>
  );
};

export default HeaderDropdown;
