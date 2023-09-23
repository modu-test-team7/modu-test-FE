'use client';

import React, { ChangeEvent, useState } from 'react';
import { UnderIineInput } from '../Input';
import { TextField } from '@mui/material';
import { FiSend } from 'react-icons/fi'

type ReplyProps = {};

const Reply: React.FC<ReplyProps> = () => {
  const [comment, setComment] = useState('');

  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="my-[10px]  shadow-lg bg-gray-100 row justify-between items-end p-[15px] rounded-lg">
        <textarea 
        rows={3}
        placeholder='댓글을 입력해주세요' 
        className='w-full focus:outline-none resize-none bg-transparent'/>
        <button><FiSend size={20} className="text-gray-500 mt-auto"/></button>
      </div>
      
    </div>
  );
};
export default Reply;
