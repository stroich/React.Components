import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { updateDetails } from '@/app/store/actions/detailsSlice.ts';
import { updateTotalPage } from '@/app/store/actions/pageSlice.ts';
import { getArtworkDetails, getArtworks } from '@/app/store/api/artwork.api.ts';
import { wrapper } from '@/app/store/store.ts';
import MainPage from '@/components/MainPage/MainPage.tsx';
import { processArtworkQueryData } from '@/hooks/transformResponse.ts';
import { IResponseArtwork, IResponseDetails } from '@/types/types.ts';

interface DetailsPageProps {
  artworks: IResponseArtwork;
  details: IResponseDetails;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, limit, search, details } = context.query;
    const getStringValue = (
      value: string | undefined | string[],
      defaultValue: string
    ) => (typeof value === 'string' ? value : defaultValue);

    const getDetails = () => getStringValue(details, '');
    const detailsRequest = store.dispatch(
      getArtworkDetails.initiate({
        id: getDetails(),
      })
    );
    const getPage = () => getStringValue(page, '1');
    const getLimit = () => getStringValue(limit, '8');
    const getSearch = () => getStringValue(search, ' ');
    const artworksRequest = store.dispatch(
      getArtworks.initiate({
        searchValue: getSearch(),
        page: getPage(),
        limit: getLimit(),
      })
    );
    const [artworksRes, detailsRes] = await Promise.all([
      artworksRequest,
      detailsRequest,
    ]);
    return {
      props: {
        artworks: artworksRes.data,
        details: detailsRes.data,
      },
    };
  }
);

const DetailsPage: FC<DetailsPageProps> = ({ artworks, details }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  let processedData;
  if (query.size) {
    processedData = processArtworkQueryData(artworks, +query.size);
  } else {
    processedData = processArtworkQueryData(artworks, 8);
  }
  dispatch(updateTotalPage(processedData.totalPages));
  const newDetails = {
    title: details.data.title,
    description: details.data.description,
    data: details.data.date_start,
    culture: details.data.artist_display,
  };
  dispatch(updateDetails(newDetails));

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

export default DetailsPage;
