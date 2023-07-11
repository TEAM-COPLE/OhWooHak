import '@/styles/globals.css';
import Layout from './components/Layout';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <Layout />
      <Component {...pageProps} />
    </>
  );
}
