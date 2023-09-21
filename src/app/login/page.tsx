'use client';

import React, { useState } from 'react';
import Button from '../../components/button/Button';
import LoginInput from '../../components/Input/LoginInput';
import OAuthButton from '../../components/button/OAuthButton';
import { RiKakaoTalkFill } from 'react-icons/ri';

type PageProps = {};

const Login: React.FC<PageProps> = () => {
  const [showPassword, setShowPassword] = useState(false);

  // // 아이콘 클릭시 실행될 함수
  // const handleIconClick = () => {
  //   console.log('handleIconClick called'); // 여기에 추가
  //   setShowPassword((prevState) => !prevState);
  // };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <LoginInput color="primary" placeholder="아이디를 입력해주세요" />
        <LoginInput
          variant="outlined"
          color="primary"
          placeholder="비밀번호를 입력해주세요"
          // onIconClick={handleIconClick}
          // showIcon={true}
        />

        <Button type="submit" primary fullWidth>
          로그인하기
        </Button>
        <OAuthButton icon={RiKakaoTalkFill}> 카카오로 로그인하기 </OAuthButton>
      </div>
    </div>
  );
};
export default Login;
