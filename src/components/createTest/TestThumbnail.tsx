import Image from 'next/image';
import React from 'react';

type TestThumbnailProps = {
  picture?: string;
};

const TestThumbnail: React.FC<TestThumbnailProps> = ({ picture }) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      {picture && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={picture} alt="썸네일 이미지" className='rounded-lg'/>
      )}
    </div>
  );
};
export default TestThumbnail;
