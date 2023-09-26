import { Comment, Tester } from '@/type/Card';
import React, { useState } from 'react';

type CommentOneProps = {
  comment: string ;
};

const CommentOne: React.FC<CommentOneProps> = ({comment, }) => {
  return (
    <div className="">
      {/* 작성 정보 */}
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
        <div>2023-09-26 16:32</div>
      </div>

      {/* 댓글 내용 */}
      <div>{comment}</div>
      <div></div>
      <hr className="my-[20px]" />
    </div>
  );
};
export default CommentOne;
