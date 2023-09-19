import Image from 'next/image';
import OAuthButton from '../components/button/OAuthButton';
import Button from '../components/button/Button';
import { BsShare } from 'react-icons/bs';
import { RiKakaoTalkFill } from 'react-icons/ri';
import ButtonGroup from '../components/button/ButtonGroup';

export default function Home() {
  return (
    <div className="w-[410px]">
      <Button secondary icon={BsShare} />
      <Button primary danger>테스트하기</Button>
      <OAuthButton icon={RiKakaoTalkFill}> 카카오로 로그인하기 </OAuthButton>
      <ButtonGroup primaryName="저장하기" secondaryName="취소" />
    </div>
  );
}
