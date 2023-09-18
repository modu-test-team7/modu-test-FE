import Image from 'next/image';
import UserButton from './components/UserButton';

export default function Home() {
  return (
    <div>
      <UserButton fullWidth type="button">로그인</UserButton>
    </div>
  );
}
