import React, { useState } from 'react';
import { MypageButton } from '@/components/button';
import { getAPI } from '@/axios';

export default function ParticipatedTests() {
  const handleParticipatedTestsClick = async () => {
    try {
      const response = await getAPI(`/api/user/join`);
      ParticipatedTests();
    } catch (error) {
      console.error('참여한 테스트 가져오는데 실패함 😭:', error);
    }
  };

  return <div className="">ㅎㅇfdfd</div>;
}
