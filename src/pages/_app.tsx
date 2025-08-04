import type { AppProps } from 'next/app';
import '../styles/globals.css';
import MenuBar from '../components/MenuBar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MenuBar />
      <Component {...pageProps} />
    </>
  );
}