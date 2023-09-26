'use client';

import TestCard from '../components/test/TestCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, OAuthButton, UpButton } from '@/components/button';
import Loading from '@/components/Loading';
import Fab from '@mui/material/Fab';
import { GrAdd, GrLinkUp } from 'react-icons/gr';
import { Tester } from '@/type/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { getAPI } from '@/axios';

export default function Home() {
  const [testCards, setTestCards] = useState<Tester[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);

  const router = useRouter();

  const isLogged = Boolean(Cookies.get('accessToken'));

  console.log(testCards);
  console.log(testCards);
  useEffect(() => {
    window.scrollTo(0, 0);

    setFadeOut(true);
    setTimeout(() => setIsLoading(false), 1000);

    const fetchTestCards = async () => {
      try {
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
  console.log(testCards);
  return (
    <div className=" mx-auto min-h-screen w-[1200px]">
      <div className="w-full bg-gray-200 h-[400px] row items-center justify-center">slider</div>

      <div className="sticky mt-[30px] top-[60px] transform translate-x-0 w-full bg-white bg-opacity-80 h-[60px] row items-center justify-start gap-[20px]">
        <button
          onClick={() => console.log('친구')}
          className="shadow-md bg-gray-50 rounded-[15px] h-[35px] text-gray-600 font-bold text-sm px-[10px] flex items-center"
        >
          친구
        </button>
        <button
          onClick={() => console.log('가족')}
          className="shadow-md bg-gray-50 rounded-[15px] h-[35px] text-gray-600 font-bold text-sm px-[10px] flex items-center"
        >
          가족
        </button>
        <button
          onClick={() => console.log('진지')}
          className="shadow-md bg-gray-50 rounded-[15px] h-[35px] text-gray-600 font-bold text-sm px-[10px] flex items-center"
        >
          진지
        </button>
        <button
          onClick={() => console.log('재미')}
          className="shadow-md bg-gray-50 rounded-[15px] h-[35px] text-gray-600 font-bold text-sm px-[10px] flex items-center"
        >
          재미
        </button>
      </div>

      <div className="my-[20px] grid grid-cols-3 gap-20">
        {testCards.map((card, index) => {
          console.log(card);
          return (
            // as={`/test-detail/${card.id}`}
            <div
              key={index}
              onClick={() => {
                if (isLogged) {
                  router.push(`/test-detail/${card.testerId}`);
                } else {
                  toast.error('로그인을 먼저 해주세요!');
                }
              }}
            >
              <TestCard tester={card} />
            </div>
          );
        })}
      </div>

      <div className="sticky z-100 bottom-[60px] transform translate-x-[1250px] mb-[50px]">
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
