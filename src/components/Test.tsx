import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';

type TestProps = {
  card?: any;
};

const Test: React.FC<TestProps> = ({ card }) => {
  return (
    <div className="w-[350px] my-[50px] shadow-md">
      <div className="text-md row items-start justify-between">
        <div className="font-bold text-gray-950">{card.title}</div>
      </div>
      <div className="w-full h-[200px] overflow-hidden relative my-[5px] rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/lib/images/sample/sample (${card.id}).png`}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto"
          alt="테스트 썸네일"
        />
      </div>
      <div className="col justify-between h-[100px] text-sm w-full p-[10px]">
        {card.details}

        <div className='row justify-between'>
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/lib/images/profile/profileSample (${card.id}).png`}
              className="object-cover h-full w-full"
              alt="작성자 프로필 사진"
            />
          </div>
          <div className="row items-center text-gray-500">
            <AiFillEye size={15} className="mr-[2px]" />
            {card.viewCount}
            <BiCommentDetail size={15} className="ml-[8px] mr-[3px]" />
            {card.commentCount}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Test;
