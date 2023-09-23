'use client';
import { useEffect } from 'react';
import { Comment, CommentGroup } from '@/components/comment';
import { ButtonGroup } from '@/components/button';
import React, { useState } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { Tester } from '@/type/Card';
import axios from 'axios';

type pageProps = {
  tester: Tester;
};

const Page: React.FC<pageProps> = ({ tester }) => {
  const router = useRouter();
  // const { id } = router.query; // 여기서 id 가져와.
  const [test, setTest] = useState<Tester[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);

  useEffect(() => {
    setFadeOut(true);
    setTimeout(() => setIsLoading(false), 1000);

    const fetchTestCards = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/tester`);
        setTest(data);
      } catch (error) {
        console.error('데이터를 가져오는데 에러가 발생했어:', error);
      }
    };
    fetchTestCards();
  }, []);

  if (isLoading) return <Loading fadeout={fadeout} isLoading={isLoading} />;

  return (
    <div className="w-[800px] col items-start mx-auto py-[60px] my-[50px]">
      <div className="w-full row justify-between items-end">
        <div className="text-lg font-bold">{test.title}</div>
        <div className="row text-gray-500 text-sm">
          <div className="">{test.userId}</div>
          <div className="">2023.09.23</div>
        </div>
      </div>

      <div className="mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/lib/images/logo_clear.png"
          alt="썸네일 이미지"
          className="rounded-xl max-h-[300px] my-[20px]"
        />
      </div>
      <div className="text-md text-gray-600 my-[10px]">테스트 내용</div>
      <div className="w-full my-[50px] col gap-10">
        <CommentGroup />
        <div className="">
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>

      <div className="scroll-to-top w-full">
        <ButtonGroup primaryName="테스트하기" icon={AiOutlineShareAlt} />
      </div>
    </div>
  );
};
export default Page;
