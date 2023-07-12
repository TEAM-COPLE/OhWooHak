import '@/styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
