'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { postAPI } from '@/config/axios';
import Cookies from 'js-cookie';

const Logout: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청을 보냅니다.
      await postAPI('/api/user/logout', {});

      // 클라이언트에서 모든 쿠키를 삭제합니다.
      Object.keys(Cookies.get()).forEach(cookie => {
        Cookies.remove(cookie);
      });

      // 사용자를 로그인 페이지로 리다이렉션합니다.
      router.push('/');
    } catch (error) {
      // 에러 처리
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default Logout;
