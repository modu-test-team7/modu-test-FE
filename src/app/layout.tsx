'use client';

import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
