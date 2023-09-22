'use client';

import TestCard from '../components/TestCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Button,
  ButtonGroup,
  OAuthButton,
  UpButton,
} from '@/components/button';
import Loading from '@/components/Loading';
import Fab from '@mui/material/Fab';
import { GrAdd, GrLinkUp } from 'react-icons/gr';
import { Card } from '@/type/Card';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  const [testCards, setTestCards] = useState<Card[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);

  // 조회 함수
  const fetchTestCards = async () => {
    const { data } = await axios.get(`http://localhost:4000/testCards`);
    setTestCards(data);
  };

  useEffect(() => {
    setFadeOut(true);
    setTimeout(() => setIsLoading(false), 1000);

    const fetchTestCards = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/testCards`);
        setTestCards(data);
      } catch (error) {
        console.error('데이터를 가져오는데 에러가 발생했어:', error);
      }
    };
    fetchTestCards();
  }, []);

  if (isLoading) return <Loading fadeout={fadeout} isLoading={isLoading} />;

  return (
    <div className=" mx-auto w-[1200px]">
      <div className="w-full bg-gray-200 h-[400px] row items-center justify-center">
        slider
      </div>
      <div className="sticky z-100 mt-[30px] top-[60px] transform translate-x-0 w-full bg-white bg-opacity-80 h-[60px] row items-center justify-start gap-[20px]">
        <button className="shadow-md bg-gray-50 rounded-[15px] h-[35px] text-gray-600 font-bold text-sm px-[10px]">
          태그하나
        </button>
        <button className="shadow-md bg-gray-50 rounded-[15px] h-[35px] text-gray-600 font-bold text-sm px-[10px]">
          태그하나
        </button>
        
      </div>

      <div className="my-[20px] grid grid-cols-3 gap-10">
        {testCards.map((card, i) => {
          return (
            <div key={card.id}>
              <TestCard card={card} />
            </div>
          );
        })}
      </div>
      <div className="sticky z-100 bottom-[60px] transform translate-x-[1250px] mb-[50px]">
        <div className="col gap-[20px]">
          <Link href="create-test">
            <Fab aria-label="add" size="small" className=" hover:shadow-sm">
              <GrAdd />
            </Fab>
          </Link>
          <UpButton />
        </div>
      </div>
    </div>
  );
}
