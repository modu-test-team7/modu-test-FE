import React, { useState, useEffect, useCallback } from 'react';
import { getAPI } from '@/axios';
import TestCard from '@/components/test/TestCard';
import { Tester } from '@/type/Card';
import { useRouter } from 'next/navigation';

export default function ParticipatedTests() {
  const [testCards, setTestCards] = useState<Tester[]>([]);
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  const router = useRouter();

  useEffect(() => {
    const fetchTestCards = async () => {
      try {
        const { data } = await getAPI(`/api/user/join`);
        setTestCards(data);
      } catch (error) {
        console.error('데이터를 가져오는데 에러가 발생했어요 😭:', error);
        setError('데이터를 불러오는데 문제가 발생했습니다.'); // 에러 상태 업데이트
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

  return (
    <div>
      {error && <div className="error-message">{error}</div>} {/* 에러 메시지 표시 */}
      <div className="my-[20px] grid grid-cols-3 gap-20">
        {testCards.map(card => (
          <div key={card.testerId} onClick={() => handleCardClick(card.testerId)}>
            <TestCard tester={card} />
          </div>
        ))}
      </div>
    </div>
  );
}
