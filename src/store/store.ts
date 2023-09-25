import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/navigation';

const Page = () => {
  const router = () =? { // 수정: next/router에서 useRouter를 가져옵니다.
  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('/lib/images/blank.png')}
)


  useEffect(() => {
    // 로딩 애니메이션 설정
    setFadeOut(true);

    async function initialize() {
      // 토큰 확인
      const accessToken = Cookies.get('accessToken');
      if (!accessToken) {
        router.replace('/');  // 수정: router 변수를 올바르게 사용합니다.
        return; // 토큰이 없으면 여기서 종료
      }

      try {
        const response = await axios.get('/user-info-endpoint');
        setUsername(response.data.username || '지두팔');
        setImage(response.data.image || '/lib/images/blank.png');
      } catch (error) {
        // 가정: 서버에서 사용자 정보를 가져오는 함수
        // 로딩 애니메이션 종료
        console.error('Failed to fetch user info:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    }

  }, [router]);
}, [router]);

export default MypageStore;