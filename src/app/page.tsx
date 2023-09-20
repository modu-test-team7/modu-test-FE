'use client';

import Test from '../components/Test';
import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../axios/api';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';

import Fab from '@mui/material/Fab';
import { GrAdd } from 'react-icons/gr';

export default function Home() {
  const router = useRouter();
  
  const [testCards, setTestCards] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);

  // 조회 함수
  const fetchTestCards = async () => {
    const { data } = await axios.get(`http://localhost:4000/testCards`);
    setTestCards(data);
  };

  const CreateTestButton = () => {
    return router.push('/create-test');
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
      <div className="w-full bg-gray-600 h-[60px] row items-center justify-center">
        <button className="rounded-lg bg-gray-900 h-[35px] text-white px-[5px] text-sm mx-[10px]">
          태그하나
        </button>
      </div>
      <div className="row my-[20px] flex-wrap justify-between">
        {testCards.map((card, i) => {
          return (
            <div key={card}>
              <Test card={card} />
            </div>
          );
        })}
        <div className="w-[350px] h-[300px] bg-white" />
        <div className="w-[350px] h-[300px] bg-white" />
      </div>
      <div className='fixed bottom-[60px] right-[100px]'>
        <Fab aria-label="add" size="small" onClick={CreateTestButton}>
          <GrAdd color="red"/>
        </Fab>
      </div>
    </div>
  );
}
