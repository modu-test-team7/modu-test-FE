import React from 'react';
import { AiFillEye, AiOutlineHeart } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { Tester } from '@/type/Card';
import Image from 'next/image';
import { FiUser } from 'react-icons/fi';

type TestProps = {
  tester: Tester;
};

const Test: React.FC<TestProps> = ({ tester }) => {
  const imgNum = tester.testerId + 1;
  return (
    <div className=" shadow-sm cursor-pointer">
      <div className="w-full flex h-[200px] overflow-hidden my-[5px] rounded-lg  shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tester.image === 'Test Image' || '' ? 'lib/images/logo_clear.png' : tester.image}
          className="object-cover h-full w-full"
          alt="테스트 썸네일"
          height={300}
          width={300}
        />
      </div>

      <div className="text-lg row items-start justify-between pt-[10px]">
        <div className="font-bold text-gray-600">{tester.title}</div>
      </div>
      <div className="col justify-between  h-[100px] text-sm w-full py-[10px]">
        <div className="h-full w-full">{tester.content}</div>

        <div className="row justify-between">
          <div className="row gap-1 items-center text-gray-500 font-bold text-sm">
            <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/lib/images/profile/profileSample (1).png`}
                className="object-cover h-full w-full"
                alt="작성자 프로필 사진"
              />
            </div>
            {tester.username}
            {tester.userId}
          </div>

          <div className="row items-center text-gray-500">
            {/* <AiOutlineHeart size={15} className="mr-[3px]" />
            {tester.likes} */}
            <AiFillEye size={15} className="ml-[8px] mr-[3px]" />
            {tester.views}
            <FiUser size={15} className="ml-[8px] mr-[3px]" />
            {tester.participates === 0 ? 0 : tester.participates}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Test;
