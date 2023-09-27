'use client';

'use client';

import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useSignUpStore } from '../../store/signupStore';
import Button from '@/components/button/Button';
import { toast } from 'sonner';
import { SignUpInput } from '@/components/Input';
import Link from 'next/link';
import Cookies from 'js-cookie';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateNickname,
} from '@/utils/validation';
import { postAPI } from '@/axios';

const SignUp: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      router.push('/'); // 로그인이 되어 있으면 홈 페이지로 이동
    }
  }, []);

  const {
    showPassword,
    showConfirmPassword,
    username,
    password,
    email,
    nickname,
    confirmPassword,
    passwordMatchError,
    togglePassword,
    toggleConfirmPassword,
    setUsername,
    setPassword,
    setNickname,
    setEmail,
    setConfirmPassword,
    setPasswordMatchError,
    isLoading,
    setIsLoading,
  } = useSignUpStore();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    if (newValue !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setConfirmPassword(newValue);
    if (newValue !== password) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('nickname:', nickname);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // 아이디 유효성 검사
    if (!validateUsername(username)) {
      console.log('Username validation failed.');
      toast.error('아이디는 영문 + 숫자로 이루어진 4글자 이상 10글자 이내로 작성해주세요.');
      setIsLoading(false);
      return;
    }

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      console.log('Email validation failed.');
      toast.error('올바른 이메일 형식을 입력해주세요.');
      setIsLoading(false);
      return;
    }

    // 닉네임 유효성 검사
    if (!validateNickname(nickname)) {
      console.log('Nickname validation failed.');
      toast.error('닉네임은 한글 혹은 영문으로 이루어진 2~8글자로 설정해주세요.');
      setIsLoading(false); // 유효성 검사 실패 시 로딩 상태를 false로 변경
      return;
    }

    // 비밀번호 유효성 검사
    if (!validatePassword(password)) {
      toast.error('비밀번호는 영문 + 숫자 + 특수기호 포함 8글자 이상 20글자 이내로 작성해주세요.');
      setIsLoading(false);
      return;
    }

    // 기존 비밀번호 일치 검사
    if (password !== confirmPassword) {
      toast.error('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    interface AxiosErrorType {
      response?: {
        data?: {
          message: string;
        };
      };
    }

    try {
      const response = await postAPI(`/api/user/signup`, {
        username,
        password,
        email,
        nickname,
      });
      console.log('API response:', response);

      toast.success('회원가입 성공!');
      router.push('/login');
    } catch (error) {
      const axiosError = error as AxiosErrorType;
      console.log('API error:', axiosError.response?.data);
      toast.error(axiosError.response?.data?.message || '회원가입 실패');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16  sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-20 py-20 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSignUp}>
          <label>아이디</label>
          <SignUpInput
            color="primary"
            placeholder="아이디를 입력해주세요"
            onChange={e => setUsername(e.target.value)}
          />
          <label>이메일</label>
          <SignUpInput
            color="primary"
            type="email"
            placeholder="이메일을 입력해주세요"
            onChange={e => setEmail(e.target.value)}
          />
          <label>닉네임</label> {/* New nickname field */}
          <SignUpInput
            color="primary"
            placeholder="닉네임을 입력해주세요"
            onChange={e => setNickname(e.target.value)}
          />
          <label>비밀번호</label>
          <SignUpInput
            color="primary"
            placeholder="비밀번호를 입력해주세요"
            type={showPassword ? 'text' : 'password'}
            onIconClick={togglePassword}
            onChange={handlePasswordChange}
            icon={showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          />
          <label>비밀번호 확인</label>
          <SignUpInput
            color="primary"
            placeholder="한 번 더 비밀번호를 입력해주세요"
            type={showConfirmPassword ? 'text' : 'password'}
            onIconClick={toggleConfirmPassword}
            onChange={handleConfirmPasswordChange}
            icon={showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          />
          {passwordMatchError && (
            <p className="text-red-500 text-xs mt-1 mb-2 text-center">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
          <Button type="submit" primary fullWidth>
            회원가입하기
          </Button>
          <div className="relative flex justify-center text-xs  mt-3">
            <Link href={'/login'} className="bg-white px-2 text-gray-600 underline">
              소셜로그인으로 계속하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
