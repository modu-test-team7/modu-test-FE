import React, { ChangeEvent } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import { Tester, Comment } from '@/type/Card';
import { CommentOne } from '@/components/comment';

type CommentGroupProps = {
  onChangeComment: (testId:number, e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  paramsId?:number;
  updateFormData:() => void;
};

const CommentGroup: React.FC<CommentGroupProps> = ({ updateFormData, onChangeComment, handleSubmit, content }) => {
  const localOnChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData('comment', e.target.value); // formData 업데이트
    onChangeComment(e); // 그리고 기존에 있던 로직을 실행
  };
  
  return (
    <div>
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
  );
};
export default CommentGroup;
