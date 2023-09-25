'use client';
/* eslint-disable */

import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { CommentOne } from '@/components/comment';
import { ButtonGroup } from '@/components/button';
import Loading from '@/components/Loading';
import { Tester, Comment } from '@/type/Card';

import { AiOutlineShareAlt } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import { toast } from 'sonner';

type pageProps = {};

const Page = ({ params }: { params: { id: number } }) => {
  const paramsId = params.id;
  const [test, setTest] = useState<Tester>();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);
  const router = useRouter();

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://13.125.200.12/api/comment', {
        content,
        userId: 'testUser',
        testId: test?.id,
      });
      toast.message('저장되었습니다');
      console.log('성공:', response);
      return router.push('/'); // 또는 다른 페이지로 리다이렉트
    } catch (error) {
      toast.message('실패하였습니다');
      console.log('에러:', error);
    }
  };

  console.log(test);

  useEffect(() => {
    setFadeOut(true);
    setTimeout(() => setIsLoading(false), 1000);

    const fetchTestCards = async () => {
      try {
        const { data } = await axios.get(`http://13.125.200.12/api/test/${paramsId}`);
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
        <div className="text-lg font-bold">{test?.title}</div>
        <div className="row text-gray-500 text-sm gap-2">
          <div className="">{test?.userId}</div>
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
      <div className="text-md bg-blue-100 p-[15px] overflow-hidden h-[100px] w-full rounded-lg text-gray-600 my-[10px] border-2 border-gray-200">
        {test?.content}
      </div>
      <div className="w-full my-[50px] col gap-10">
        <hr className="border-gray-500" />
        <div>
          <div className="row gap-2 items-center justify-start text-gray-500">
            <BiCommentDetail size={15} className="mt-1" />
            {/* {test?.commentCount} */}
            123
          </div>
          <div className="my-[10px]  shadow-lg bg-gray-100 row justify-between items-end p-[15px] rounded-lg">
            <textarea
              rows={3}
              placeholder="댓글을 입력해주세요"
              className="w-full focus:outline-none resize-none bg-transparent"
              value={content}
              onChange={onChangeComment}
              name="testTitle"
            />
            <button type="button" onClick={handleSubmit}>
              <FiSend size={20} className="text-gray-500 mt-auto" />
            </button>
          </div>
        </div>

        <div className="">
          <CommentOne paramsId={paramsId} />
        </div>
      </div>
      <div className="scroll-to-top w-full">
        <ButtonGroup primaryName="테스트하기" icon={AiOutlineShareAlt} />
      </div>
    </div>
  );
};
export default Page;
