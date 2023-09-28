// CommentInput.tsx
import React, { ChangeEvent } from 'react';
import { FiSend } from 'react-icons/fi';

interface CommentInputProps {
  value?: string;
  setValue: (value: string) => void;
  onClickAddComment: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ value, setValue, onClickAddComment }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="mb-[10px] shadow-lg bg-gray-100 row justify-between items-end p-[15px] rounded-lg">
      <textarea
        rows={3}
        placeholder="댓글을 입력해주세요"
        className="w-full focus:outline-none resize-none bg-transparent"
        value={value}
        onChange={e => onChangeHandler(e)}
        name="testTitle"
      />
      <button type="button" onClick={onClickAddComment}>
        <FiSend size={20} className="text-gray-500 mt-auto" />
      </button>
    </div>
  );
};

export default CommentInput;
