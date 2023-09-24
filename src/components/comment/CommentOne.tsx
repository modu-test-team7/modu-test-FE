import { Comment } from '@/type/Card';
import React, { useState } from 'react';

type CommentProps = {
  paramsId: number | string;
};

const Comment: React.FC<CommentProps> = () => {
  const [comment, setComment] = useState<Comment>();
  return (
    <div className="mb-[20px]">
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
        <div>2023.09.23 14:35</div>
      </div>

      {/* 댓글 내용 */}
      <div>댓글 내용</div>
      <div></div>
      <hr className="my-[20px]" />
    </div>
  );
};
export default Comment;
