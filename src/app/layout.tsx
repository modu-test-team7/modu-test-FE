'use client';
import '../globals.css';
import { Header, Footer } from '@/components/layout';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV !== 'production' ? <ReactQueryDevtools initialIsOpen={false} /> : null}
          <Header />
          <div className="wrap">
            <Toaster position="top-center" richColors />
            {children}
          </div>
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
