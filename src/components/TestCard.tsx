import React from 'react';
import { AiFillEye, AiOutlineHeart } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { Card } from "@/type/Card";
import Image from 'next/image';

type TestProps = {
  card: Card;
};

const Test: React.FC<TestProps> = ({ card }) => {
  const imgNum = card.id + 1
  return (
    <div className="my-[50px] shadow-md">
      <div className="text-md row items-start justify-between">
        <div className="font-bold text-gray-950">{card.title}</div>
      </div>
      <div className="w-full h-[200px] overflow-hidden relative my-[5px] rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src={card.image}
          alt="테스트 썸네일"
          height={300}
          width={300}
        />
        
      </div>
      <div className="col justify-between h-[100px] text-sm w-full p-[10px]">
        {card.content}

        <div className='row justify-between'>
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/lib/images/profile/profileSample (${imgNum}).png`}
              className="object-cover h-full w-full"
              alt="작성자 프로필 사진"
            />
            {card.writer}
          </div>
          <div className="row items-center text-gray-500">
            <AiOutlineHeart size={15} className="mr-[3px]" />
            {card.likes}
            <AiFillEye size={15} className="ml-[8px] mr-[3px]" />
            {card.views}
            {/* <BiCommentDetail size={15} className="ml-[8px] mr-[3px]" />
            {card.commentCount} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Test;
