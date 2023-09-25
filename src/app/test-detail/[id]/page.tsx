'use client';
/* eslint-disable */

import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { CommentOne, CommentInput } from '@/components/comment';
import { Button, ButtonGroup, UpButton } from '@/components/button';
import Loading from '@/components/Loading';
import { Tester, Comment } from '@/type/Card';
import TestDoit from '@/components/test/TestDoit';

import { BiCommentDetail } from 'react-icons/bi';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

const Page = ({ params }: { params: { id: number } }) => {
  const paramsId = params.id;
  const [test, setTest] = useState<Tester>();
  const [commentValue, setCommentValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
    participates: 1,
    questions: [
      {
        title: '',
        image: '',
        choices: [
          {
            content: '',
            isCorrect: false,
          },
        ],
      },
    ],
    results: [
      {
        image: '',
        content: '',
        score: 0,
      },
    ],
    comments: [
      {
        comment: '',
        createdAt: '',
        modifiedAt: '',
      },
    ],
  });

  const updateFormData = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const onClickSaveComment = async () => {
    try {
      console.log('댓글 저장 버튼 클릭');

      // 댓글 추가
      const newComments = [
        ...formData.comments,
        {
          comment: commentValue,
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
        },
      ];

      // formData 업데이트
      setFormData({
        ...formData,
        comments: newComments,
      });

      const response = await axios.post(`http://13.125.200.12/api/${paramsId}/comment`, {
        ...formData,
      });
      toast.message('댓글이 저장되었습니다');
      console.log('성공:', response);
    } catch (error) {
      toast.message('실패하였습니다');
      console.log('에러:', error);
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      router.replace('/');
    }

    setFadeOut(true);
    setTimeout(() => setIsLoading(false), 1000);

    const fetchTestCards = async () => {
      try {
        window.scrollTo(0, 0);
        const { data } = await axios.get(`http://13.125.200.12/api/test/${paramsId}`);
        setTest(data);
      } catch (error) {
        console.error('데이터를 가져오는데 에러가 발생했어:', error);
      }
    };

    fetchTestCards();
  }, [router]);

  if (isLoading) {
    return <Loading fadeout={fadeout} isLoading={isLoading} />;
  }

  const onClickModal = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  console.log(paramsId);

  return (
    <div className="w-[800px] col items-start mx-auto py-[60px] my-[50px]">
      <div className="w-full row justify-between items-end">
        <div className="text-lg font-bold">{test?.title}</div>
        <div className="row text-gray-500 text-sm gap-2">
          <div className="">{test?.username} | </div>
          <div className="">2023.09.23</div>
        </div>
      </div>

      <div className="mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {test?.image && (
          <img
            src={test?.image}
            alt="썸네일 이미지"
            className="rounded-xl max-h-[300px] my-[20px] mx-auto"
          />
        )}
      </div>
      <div className="text-md p-[3px] flex items-center justify-center bg-blue-100 overflow-hidden h-[100px] w-full text-gray-800 my-[10px]">
        <div className="h-full w-full bg-white p-[10px]">{test?.content}</div>
      </div>
      <div className="ml-auto bg-gray-200 px-[10px] font-bold py-[3px] rounded-[20px] text-xs text-gray-500">
        {test?.category}
      </div>

      {/* 테스트 버튼 */}
      <div className="w-full flex flex-row gap-2 items-center justify-between">
        <Button secondary>공유하기</Button>
        <Button primary onClick={onClickModal}>
          {isOpen ? '테스트 닫기' : '테스트 하기'}
        </Button>
      </div>

      {/* 테스트하기 */}
      {/* {isOpen && <TestDoit test={test}/>} */}
      {/* {isOpen && (
        <div>
      )} */}

      {/* 댓글 */}
      <div className="w-full my-[50px] col gap-10">
        <hr className="border-gray-500" />
        <div>
          <div className="row gap-2 items-center justify-start text-gray-500">
            <BiCommentDetail size={15} className="mt-1" />
            {/* {test?.commentCount} */}
            123
          </div>
        </div>
        <CommentInput
          value={commentValue}
          setValue={value => {
            setCommentValue(value); // 새로운 상태 업데이트
            updateFormData('comment', value);
          }}
          onClickSaveComment={onClickSaveComment}
        />
        {/* {test?.comments.map((comment, index) => {
          return (
            <div>
              <CommentOne comment={comment} paramsId={paramsId} />
            </div>
          );
        })} */}

        {/* 댓글 하나 map 성공하면 지우기 */}
        <div className="mb-[20px]">
          {/* 작성 정보 */}

          {/* 댓글 내용 */}
          {formData.comments.map((comment, index) => (
            <div className="col justify-center text-gray-500 text-sm mb-[10px]">
              <div className="row justify-between items-center text-gray-500 text-sm mb-[10px]">
                {/* 작성자 */}
                <div className="row gap-1 items-center font-bold ">
                  <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/lib/images/profile/profileSample (1).png"
                      className="object-cover h-full w-full"
                      alt="작성자 프로필 사진"
                    />
                  </div>
                  작성자
                </div>

                {/* 작성일자 */}
                <div>2023.09.23 14:35</div>
              </div>

              <div key={index} className="min-h-[50px] bg-gray-100">
                {comment.comment}
              </div>
              <div>
                <button type="button" onClick={() => toast.message('수정버튼')}>
                  수정
                </button>
                <button>삭제</button>
              </div>
            </div>
          ))}
          {/* <div className="min-h-[50px]">{test?.comment}</div> */}
          <hr className="my-[20px]" />
        </div>
      </div>
      <div className="sticky z-100 bottom-[40px] transform translate-x-[1050px]">
        <UpButton />
      </div>
    </div>
  );
};
export default Page;
