import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { AppProps } from 'next/app';
import Modal from 'react-modal';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Set up react-modal app element
  Modal.setAppElement('#__next');

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const accessToken = Cookies.get('accessToken');
      if (accessToken && (url.includes('/signup') || url.includes('/login'))) {
        router.push('/');
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
