'use client';
import '../globals.css';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useEffect, useState } from 'react';

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
      <body>
        {/* {isLoading ? null : <Header />} */}
        <Header />
        <div className="wrap">{children}</div>
        {/* {isLoading ? null : <Footer />} */}
        <Footer />
      </body>
    </html>
  );
}
