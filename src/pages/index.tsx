import Head from 'next/head';

import MainPage from '@/components/MainPage/MainPage.tsx';

export default function Home() {
  return (
    <>
      <Head>
        <title>Works of art</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/museum.svg" />
      </Head>
      <MainPage />
    </>
  );
}
