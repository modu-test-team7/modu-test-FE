'use client';

import React, { ChangeEvent, useState } from 'react';


type ReplyProps = {};

const Reply: React.FC<ReplyProps> = () => {
  const [comment, setComment] = useState('');

  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div></div>
  );
};
export default Reply;
