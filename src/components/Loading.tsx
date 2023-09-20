import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

type LoadingProps = {
  fadeout: boolean;
  isLoading: boolean;
};

const Loading:React.FC<LoadingProps> = ({ fadeout, isLoading }) => {

  return (
    <main className="col h-[100vh] w-[100vw] justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 overflow-hidden">
    <div
      className={clsx(
        "sm:mx-auto sm:w-full sm:max-w-md",
        fadeout
          ? "opacity-0 transition-opacity duration-1000"
          : "opacity-100"
      )}
    >
      <Image
        src="/lib/images/logo_clear.png"
        height="64"
        width="64"
        alt="logo"
        className="mx-auto w-auto"
      />
      <h2 className="text-center mt-6 text-2xl font-bold tracking-tight text-gray-900">
        모두의 테스트
      </h2>
    </div>
  </main>
  )
}
export default Loading;