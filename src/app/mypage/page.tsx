'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loading from '@/components/Loading';
import { MypageButton } from '@/components/button';
import { ProfileImage, UserInfo, ParticipatedTests, CreatedTests } from '@/app/mypage/components';

const Mypage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);
  const [image, setImage] = useState<string>('/lib/images/blank.png');
  const [username, setUsername] = useState<string>('지두팔'); // 임시
  const [participatedTests, setParticipatedTests] = useState(false);
  const [createdTests, setCreatedTests] = useState<any[]>([]);
  const [isParticipatedTestsVisible, setIsParticipatedTestsVisible] = useState(false);
  const [isCreatedTestsVisible, setIsCreatedTestsVisible] = useState(false);

  useEffect(() => {
    // 로딩 애니메이션 설정
    setFadeOut(true);

    async function initialize() {
      // 토큰 확인
      const accessToken = Cookies.get('accessToken'); // 쿠키에서 엑세스 토큰 가져오기
      // if 엑세스 토큰이 없으면?
      if (!accessToken) {
        router.replace('/'); // 메인으로 리다이렉트
        return; // 토큰이 없으면 여기서 종료 (이후 코드 실행 X)
      }

      try {
        // 서버에서 사용자 정보를 가져오는 함수
        const response = await axios.get('/user');
        // 응답에서 username을 가져와 setUsername 상태를 업데이트하거나, username이 없으면 '지두팔'로 설정
        setUsername(response.data.username || '지두팔');
        // 응답에서 image를 가져와 setImage 상태를 업데이트하거나, image가 없으면 기본 이미지
        setImage(response.data.image || '/lib/images/blank.png');
      } catch (error) {
        // 요청 실패 시, catch 블록 실행됨, 에러 객체 받음
        console.error('Failed to fetch user info:', error);
      } finally {
        // try || catch 블록 실행 후 finally 블록 실행
        // 로딩 애니메이션 종료
        setTimeout(() => setIsLoading(false), 1000); // 1초 후 setIsLoading 호출하며 로딩 상태를 false로 설정
      }
    }

    initialize(); // 위에서 정의한 함수를 호출
  }, [router]);

  const handleCreatedTestsClick = () => {
    setIsCreatedTestsVisible(prevState => !prevState); // 만든 테스트를 보이게 설정
    setIsParticipatedTestsVisible(false); // 참여 테스트를 숨기게 설정
  };

  const handleParticipatedTestsClick = () => {
    setIsParticipatedTestsVisible(prevState => !prevState); // 참여 테스트를 보이게 설정
    setIsCreatedTestsVisible(false); // 만든 테스트를 숨기게 설정
  };

  if (isLoading) return <Loading fadeout={fadeout} isLoading={isLoading} />;

  return (
    <div>
      <div className="max-w-[1200px] mx-auto mt-16 p-8 flex bg-[#11B767]">
        <ProfileImage image={image} setImage={setImage} />
        <UserInfo username={username} setUsername={setUsername} />
      </div>
      <div className="flex flex-col w-[1200px] h-[100vh] mx-auto p-5 bg-slate-100 overflow-y-auto">
        <div className="mt-5 flex-grow bg-slate-100">
          <MypageButton label="참여 테스트" onClick={handleParticipatedTestsClick} />
          <MypageButton label="만든 테스트" onClick={handleCreatedTestsClick} />
        </div>
        <div className="max-w-[1150px] mx-auto">
          {isParticipatedTestsVisible && <ParticipatedTests />}
          {isCreatedTestsVisible && <CreatedTests />}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
