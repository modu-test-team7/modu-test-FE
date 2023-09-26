import React, { useState, useEffect, useCallback } from 'react';
import { MypageButton } from '@/components/button';
import { getAPI } from '@/axios';
import TestCard from '@/components/TestCard';
import { Tester } from '@/type/Card';
import { useRouter } from 'next/navigation';

export default function CreatedTests() {
  const [testCards, setTestCards] = useState<Tester[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTestCards = async () => {
      try {
        const { data } = await getAPI(`/api/test`);
        setTestCards(data);
      } catch (error) {
        console.error('데이터를 가져오는데 에러가 발생했어:', error);
      }
    };
    fetchTestCards();
  }, []);

  const handleCardClick = useCallback(
    (testerId: number) => {
      router.push(`/test-detail/${testerId}`);
    },
    [router],
  );

  const handleCreatedTestsClick = async () => {
    try {
      const response = await getAPI(`/api/user/tests`);
      setTestCards(response.data); // 상태 업데이트
    } catch (error) {
      console.error('만든 테스트 가져오는데 실패함 😭:', error);
    }
  };

  return (
    <div>
      <div className="my-[20px] grid grid-cols-3 gap-20">
        {testCards.map(card => (
          <div key={card.testerId} onClick={() => handleCardClick(card.testerId)}>
            <TestCard tester={card} />
          </div>
        ))}
      </div>
      {/* <div className="sticky z-100 bottom-[60px] transform translate-x-[1250px] mb-[50px]"></div> */}
    </div>
  );
}
