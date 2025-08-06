// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import MenuBar from '../components/MenuBar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      document.body.classList.add('page-exit');
    };
    const handleComplete = () => {
      document.body.classList.remove('page-exit');
      document.body.classList.add('page-enter');
      setTimeout(() => document.body.classList.remove('page-enter'), 700);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router]);

  return (
    <>
      <MenuBar />
      <Component {...pageProps} />
    </>
  );
}
