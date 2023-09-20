import React from 'react';

type TestThumbnailProps = {
  thumbnail?: string;
};

const TestThumbnail: React.FC<TestThumbnailProps> = ({ thumbnail }) => {
  return (
    <div className='w-full h-[300px] flex items-center justify-center'>
      {thumbnail && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src="/lib/images/logo_clear.png" alt="썸네일 이미지"/>
      )}
    </div>
  );
};
export default TestThumbnail;
