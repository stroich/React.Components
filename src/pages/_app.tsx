import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import Layout from '@/components/Layout/Layout.tsx';

export function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default App;
