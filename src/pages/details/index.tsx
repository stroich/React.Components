import Head from 'next/head';
import React from 'react';

import MainPage from '@/components/MainPage/MainPage.tsx';

const DetailsPage = () => {
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
};

export default DetailsPage;
