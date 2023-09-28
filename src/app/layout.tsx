'use client';
import '../globals.css';
import { Header, Footer } from '@/components/layout';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <Header />
        <div className="wrap">
          <Toaster position="top-center" richColors />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
