'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import Button from '../../components/button/Button';
import LoginInput from '../../components/Input/LoginInput';
import OAuthButton from '../../components/button/OAuthButton';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FaGithub } from 'react-icons/fa';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import useSignUpStore from '../../store/store';
type PageProps = {};

const Login: React.FC<PageProps> = () => {
  const { showPassword, togglePassword } = useSignUpStore();
  const router = useRouter(); // router 추가

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem('jwt'); // Local Storage에서 JWT를 가져옵니다.

    axios
      .get('NEXT_PUBLIC_JSON_URL', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // 성공적인 응답 처리
        toast.success('로그인 성공 😎');
      })
      .catch((error) => {
        // 오류 처리
        toast.error('로그인 실패 😥');
      });

    const handleKakaoLogin = () => {
      // 카카오 로그인 로직 구현
    };

    const handleGithubLogin = () => {
      // 깃헙 로그인 로직 구현
    };

    // 로그인 성공 후 메인 페이지로 이동
    router.push('/');
  };

  return (
    <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-md ">
      <div className="bg-white px-20 py-20 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleLogin}>
          <label>아이디</label>
          <LoginInput color="primary" placeholder="아이디를 입력해주세요" />
          <label>비밀번호</label>
          <LoginInput
            color="primary"
            placeholder="비밀번호를 입력해주세요"
            type={showPassword ? 'text' : 'password'}
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
                signIn();
              }}
            >
              카카오로 로그인하기
            </OAuthButton>

            {/* 깃허브 버튼 */}
            <OAuthButton
              icon={FaGithub}
              onClick={() => {
                signIn();
              }}
            >
              깃헙으로 로그인하기
            </OAuthButton>
          </div>

          <div className="relative flex justify-center text-xs mt-3">
            <span className="text-gray-400">아직 회원이 아니신가요?</span>
            <Link
              href={'/signup'}
              className="bg-white px-2  text-gray-600 underline"
            >
              회원가입 하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
