'use client';
import React from 'react';
import Button from '../../components/button/Button';
import LoginInput from '../../components/Input/LoginInput';
import useSignUpStore from '../../store/store'; // 경로는 실제 프로젝트의 구조에 따라 변경해야 합니다.

const SignUp = () => {
  const { showPassword, togglePassword } = useSignUpStore();

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <form>
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <LoginInput color="primary" placeholder="아이디를 입력해주세요" />

          <LoginInput
            color="primary"
            placeholder="비밀번호를 입력해주세요"
            type={showPassword ? 'text' : 'password'}
            onIconClick={togglePassword}
            showIcon={true}
          />
          <LoginInput
            color="primary"
            placeholder="한 번더 비밀번호를 입력해주세요"
            type={showPassword ? 'text' : 'password'}
            onIconClick={togglePassword}
            showIcon={true}
          />
          <Button type="submit" primary fullWidth>
            회원가입하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
