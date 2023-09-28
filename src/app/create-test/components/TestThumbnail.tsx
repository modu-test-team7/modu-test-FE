import Image from 'next/image';
import React from 'react';

type TestThumbnailProps = {
  image?: string;
};

const TestThumbnail: React.FC<TestThumbnailProps> = ({ image }) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      {image && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={image} alt="썸네일 이미지" className='rounded-lg max-h-[300px]'/>
      )}
    </div>
  );
};
export default TestThumbnail;