import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { updateNumberOfCard } from '@/app/store/actions/numberOfCardSlice.ts';
import { updatePage, updateTotalPage } from '@/app/store/actions/pageSlice.ts';
import { updateSearch } from '@/app/store/actions/searchSlice.ts';
import {
  getArtworks,
  getRunningQueriesThunk,
} from '@/app/store/api/artwork.api.ts';
import { wrapper } from '@/app/store/store.ts';
import MainPage from '@/components/MainPage/MainPage.tsx';
import { processArtworkQueryData } from '@/hooks/transformResponse.ts';
import { IResponseArtwork } from '@/types/types.ts';

const getStringValue = (
  value: string | undefined | string[],
  defaultValue: string
) => (typeof value === 'string' ? value : defaultValue);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, limit, search } = context.query;
    const getPage = () => getStringValue(page, '1');
    const getLimit = () => getStringValue(limit, '8');
    const getSearch = () => getStringValue(search, ' ');
    store.dispatch(updatePage(+getPage()));
    store.dispatch(updateSearch(getSearch()));
    store.dispatch(updateNumberOfCard(+getLimit()));
    store.dispatch(
      getArtworks.initiate({
        searchValue: getSearch(),
        page: getPage(),
        limit: getLimit(),
      })
    );

    const [res] = await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {
        data: res.data,
      },
    };
  }
);

interface HomePageProps {
  data: IResponseArtwork;
}

const Home: FC<HomePageProps> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  let processedData;
  if (query.size) {
    processedData = processArtworkQueryData(data, +query.size);
  } else {
    processedData = processArtworkQueryData(data, 8);
  }
  dispatch(updateTotalPage(processedData.totalPages));

  return (
    <>
      <Head>
        <title>Works of art</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/museum.svg" />
      </Head>
      <MainPage arrArtworks={processedData.arrArtWork} />
    </>
  );
};

export default Home;
