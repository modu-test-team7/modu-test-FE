'use client';

import '../globals.css';
import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 해제
  }, []);

  if (!children) return null;
  return (
    <html>
      <Header />
      <main className={`max-w-[800px] mx-auto ${inter.className}`}>
        {children}
      </main>
      <Footer />
    </html>
  );
}
