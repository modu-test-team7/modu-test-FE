// pages/login/index.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LoginForm } from './';

const Login: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      router.push('/'); // 로그인이 되어 있으면 홈 페이지로 이동
    }
  }, [router]);

  return (
    <div className="bg-white px-20 py-20 shadow sm:rounded-lg sm:px-10">
      <LoginForm />
    </div>
  );
};

export default Login;
