'use client';

import React from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useSignUpStore } from '../../store/signupStore';
import Button from '../../components/button/Button';
import LoginInput from '../../components/Input/LoginInput';
import Link from 'next/link';

const SignUp = () => {
  const {
    showPassword,
    showConfirmPassword,
    username,
    password,
    email,
    confirmPassword,
    passwordMatchError,
    togglePassword,
    toggleConfirmPassword,
    setUsername,
    setPassword,
    setEmail,
    setConfirmPassword,
    setPasswordMatchError,
    isLoading,
    setIsLoading,
  } = useSignUpStore();

  const router = useRouter();

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
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    setIsLoading(false);

    // 아이디 유효성 검사
    const idRegex = /^[A-Za-z0-9]{1,10}$/;
    if (!idRegex.test(username)) {
      console.log('Username validation failed.');
      toast.error('아이디는 영문 + 숫자로 이루어진 10글자 이내로 작성해주세요.');
      return;
    }

    // 이메일 유효성 검사
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      console.log('Email validation failed.');
      toast.error('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    // 비밀번호 유효성 검사
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      toast.error('비밀번호는 영문 + 숫자 + 특수기호 포함 8글자 이상 20글자 이내로 작성해주세요.');
      return;
    }

    // 기존 비밀번호 일치 검사
    if (password !== confirmPassword) {
      toast.error('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/api/user/signup`,
        {
          username,
          password,
          email,
        },
        { withCredentials: true },
      );
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
          <LoginInput
            color="primary"
            placeholder="아이디를 입력해주세요"
            onChange={e => setUsername(e.target.value)}
          />

          <label>이메일</label>
          <LoginInput
            color="primary"
            type="email"
            placeholder="이메일을 입력해주세요"
            onChange={e => setEmail(e.target.value)}
          />

          <label>비밀번호</label>
          <LoginInput
            color="primary"
            placeholder="비밀번호를 입력해주세요"
            type={showPassword ? 'text' : 'password'}
            onIconClick={togglePassword}
            onChange={handlePasswordChange} // 이 부분 추가
            icon={showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          />

          <label>비밀번호 확인</label>
          <LoginInput
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
