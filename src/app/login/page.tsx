'use client';

import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import Button from '../../components/button/Button';
import LoginInput from '../../components/Input/LoginInput';
import OAuthButton from '../../components/button/OAuthButton';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FaGithub } from 'react-icons/fa';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';
import useSignUpStore from '@/store/loginStore';
import { postAPI } from '@/axios';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';

type PageProps = {};

const Login: React.FC<PageProps> = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      router.push('/'); // 로그인이 되어 있으면 홈 페이지로 이동
    }
  }, []);

  const [username, setUsername] = useState(''); // 아이디 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const { showPassword, togglePassword } = useSignUpStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postAPI('/api/user/login', { username, password })
      .then(response => {
        Cookies.set('accessToken', response.data.token);
        Cookies.set('refreshToken', response.data.refreshToken);
        toast.success('로그인 성공 😎');
        router.push('/');
        console.log(response);
      })
      .catch(error => {
        // 요건 서버랑 맞춰야된대
        toast.error(error.response.data.message);
        toast.error('로그인 실패 😥');
        console.log(error);
        if (error.response) {
          console.log("Data:", JSON.stringify(error.response.data, null, 2));
        }
      });

    // axios
    //   .post(
    //     `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/user/login`,
    //     {
    //       // post 메서드로 변경
    //       username, // 아이디 전달
    //       password, // 비밀번호 전달
    //     },
    //     // { withCredentials: true },
    //   )
    //   .then(response => {
    //     console.log(response.data);
    //     // const { accessToken, refreshToken } = response.data;
    //     const accessToken = response.data.token;
    //     const refreshToken = response.data.refreshToken;
    //     console.log(accessToken, refreshToken);
    //     // Cookies.set();

    //     toast.success('로그인 성공 😎');
    //     router.push('/');
    //   })
    //   .catch(error => {
    //     console.error('Error during login:', error);
    //     toast.error('로그인 실패 😥');
    //   });
  };

  return (
    <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-md ">
      <div className="bg-white px-20 py-20 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleLogin}>
          <label>아이디</label>
          <LoginInput
            color="primary"
            placeholder="아이디를 입력해주세요"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label>비밀번호</label>
          <LoginInput
            color="primary"
            placeholder="비밀번호를 입력해주세요"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onIconClick={togglePassword}
            icon={showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          />

          <Button type="submit" primary fullWidth>
            로그인하기
          </Button>
          <div>
            {/* 카카오 버튼 */}
            <OAuthButton
              icon={RiKakaoTalkFill}
              isKakao={true} // 카카오 아이콘일 경우 true로 설정
              onClick={() => {
                // signIn();
              }}
            >
              카카오로 로그인하기
            </OAuthButton>

            {/* 깃허브 버튼 */}
            <OAuthButton
              icon={FaGithub}
              onClick={() => {
                // signIn();
              }}
            >
              GitHub 으로 로그인하기
            </OAuthButton>
          </div>

          <div className="relative flex justify-center text-xs mt-3">
            <span className="text-gray-400">아직 회원이 아니신가요?</span>
            <Link href={'/signup'} className="bg-white px-2  text-gray-600 underline">
              회원가입 하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;