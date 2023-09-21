'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import Button from '../../components/button/Button';
import LoginInput from '../../components/Input/LoginInput';
import useSignUpStore from '../../store/store';
import Link from 'next/link';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const router = useRouter();

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 아이디 유효성 검사
    const idRegex = /^[A-Za-z0-9]{1,10}$/;
    if (!idRegex.test(username)) {
      toast.error(
        '아이디는 영문 + 숫자로 이루어진 10글자 이내로 작성해주세요.'
      );
      return;
    }

    // 비밀번호 유효성 검사
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        '비밀번호는 영문 + 숫자 + 특수기호 포함 8글자 이상 20글자 이내로 작성해주세요.'
      );
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
      await axios.post(`${process.env.NEXT_PUBLIC_JSON_URL}/users`, {
        username,
        password,
      });

      toast.success('회원가입 성공!');
      router.push('/login');
    } catch (error) {
      const axiosError = error as AxiosErrorType;
      console.log(axiosError.response?.data); // 오류 데이터 출력
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
            onChange={(e) => setUsername(e.target.value)}
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
            icon={
              showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
            }
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
            <Link
              href={'/login'}
              className="bg-white px-2 text-gray-600 underline"
            >
              소셜로그인으로 계속하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;