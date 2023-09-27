'use client';

import TestCard from '../components/test/TestCard';
import { useState, useEffect } from 'react';
import { UpButton } from '@/components/button';
import Loading from '@/components/Loading';
import Fab from '@mui/material/Fab';
import { GrAdd } from 'react-icons/gr';
import { Tester } from '@/type/Card';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { getAPI } from '@/config/axios';

export default function Home() {
  const [testCards, setTestCards] = useState<Tester[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);
  const [category, setCategory] = useState<string>('');

  const router = useRouter();

  const isLogged = Boolean(Cookies.get('accessToken'));

  const fetchCategory = async (category: string) => {
    try {
      const { data } = await getAPI(`/api/tests/${category}`);
      // const { data } = await getAPI(`/api/tests`);
      setTestCards(data);
    } catch (error) {
      console.error('데이터를 가져오는데 에러가 발생했어:', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    setFadeOut(true);
    setTimeout(() => setIsLoading(false), 1000);

    const fetchTestCards = async () => {
      try {
        // 여기
        const { data } = await getAPI(`/api/test`);
        // const { data } = await getAPI(`/api/tests`);
        setTestCards(data);
      } catch (error) {
        console.error('데이터를 가져오는데 에러가 발생했어:', error);
      }
    };
    fetchTestCards();
  }, []);

  if (isLoading) return <Loading fadeout={fadeout} isLoading={isLoading} />;

  return (
    <div className=" mx-auto min-h-screen w-[1200px]">
      <div className="w-full bg-gray-200 h-[400px] row items-center justify-center">
        <button onClick={() => console.log(testCards)}>데이터보기 버튼</button>
        slider
      </div>

      <div className="sticky mt-[30px] top-[60px] transform translate-x-0 w-full bg-white bg-opacity-80 h-[60px] row items-center justify-start gap-[20px]">
        <button
          onClick={() => fetchCategory('친구')}
          className="shadow-md bg-gray-50 rounded-[15px] h-[35px] text-gray-600 font-bold text-sm px-[10px] flex items-center"
        >
          친구
        </button>
        <button
          onClick={() => fetchCategory('가족')}
          className="shadow-md bg-gray-50 rounded-[15px] h-[35px] text-gray-600 font-bold text-sm px-[10px] flex items-center"
        >
          가족
        </button>
        <button
          onClick={() => fetchCategory('진지')}
          className="shadow-md bg-gray-50 rounded-[15px] h-[35px] text-gray-600 font-bold text-sm px-[10px] flex items-center"
        >
          진지
        </button>
        <button
          onClick={() => fetchCategory('재미')}
          className="shadow-md bg-gray-50 rounded-[15px] h-[35px] text-gray-600 font-bold text-sm px-[10px] flex items-center"
        >
          재미
        </button>
      </div>

      <div className="my-[20px] grid grid-cols-3 gap-20">
        {testCards.map((card, index) => {
          return (
            // as={`/test-detail/${card.id}`}
            <div
              key={index}
              onClick={() => {
                // 여기
                router.push(`/test-detail/${card.testerId}`);
              }}
            >
              <TestCard tester={card} />
            </div>
          );
        })}
      </div>
      {/* translate-y-[200px] */}
      <div className="sticky z-100 transform translate-x-[1250px]  bottom-[60px] mb-[50px]">
        <div className="col gap-[20px]">
          <Fab
            onClick={() => {
              if (isLogged) {
                router.push(`/create-test`);
              } else {
                toast.error('로그인을 먼저 해주세요!');
              }
            }}
            aria-label="add"
            size="small"
            className=" hover:shadow-sm"
          >
            <GrAdd />
          </Fab>
          <UpButton />
        </div>
      </div>
    </div>
  );
}
