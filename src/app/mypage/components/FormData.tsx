// 필요한 라이브러리를 가져옵니다.
import { postAPI } from '@/axios';
import { toast } from 'sonner';

// 이 인터페이스는 서버의 응답을 설명합니다.
interface ApiResponse {
  data: any; // 서버 응답의 형태에 따라 이 타입을 수정하십시오.
}

// 이 함수는 닉네임과 이미지를 받아서 서버에 POST 요청을 보냅니다.
async function uploadData(nickname: string, image: File): Promise<void> {
  // FormData 객체를 생성합니다.
  const formData = new FormData();

  // 닉네임과 파일을 FormData 객체에 추가합니다.
  formData.append('nickname', nickname);
  formData.append('image', image);

  try {
    // POST 요청을 보냅니다.
    const result: ApiResponse = await postAPI('api/upload', formData);

    // 응답을 콘솔에 출력합니다.
    console.log(result.data);
  } catch (error) {
    // 오류를 콘솔에 출력합니다.
    console.error(error);

    // 에러 토스트 메시지를 표시합니다.
    toast.error('업로드 중에 문제가 발생했습니다.');
  }
}
