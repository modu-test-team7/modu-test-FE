'use client'

import React, { useState, useEffect } from 'react';
import { getAPI } from '@/config/axios';
import { Tester } from '@/type/Card';

type pageProps = {
  
};

const Page = ({ params }: { params: { id: number } }) => {
  const paramsId = params.id;
  const [test, setTest] = useState<Tester>({
    testId: 0,
    testerId: 0,
    userId: '',
    title: '',
    content: '',
    image: '',
    views: 0,
    likes: 0,
    category: '',
    username: '',
    comments: [],
    questions: [],
    comment: '',
    commentId: 0,
    participates: 0,
  });

  useEffect(() => {
    const fetchTestCards = async () => {
      try {
        window.scrollTo(0, 0);
        const { data } = await getAPI(`/api/test/${paramsId}`);
        setTest(data);
      } catch (error) {
        console.error('데이터를 가져오는데 에러가 발생했어:', error);
      }
    };

    fetchTestCards();
  }, [paramsId]);
  
  return <div className="w-screen h-screen bg-gray-200">Have a good coding</div>
}
export default Page;