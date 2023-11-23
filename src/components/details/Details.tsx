import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useGetArtworkDetailsQuery } from '@/app/store/api/artwork.api.ts';

import styles from './Details.module.css';
import DetailCard from '../DetailCard/DetailCard.tsx';
import Loading from '../Loading/Loading.tsx';

const Details = () => {
  const router = useRouter();
  const { query } = router;
  const page = query.page;
  const [details, setDetails] = useState({
    title: '',
    description: '',
    data: '',
    culture: '',
  });
  const detailsSearchParams = query.details as string;
  const { data, error, isFetching } =
    useGetArtworkDetailsQuery(+detailsSearchParams);

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (data) {
      const newDetails = {
        title: data.data.title,
        description: data.data.description,
        data: data.data.date_start,
        culture: data.data.artist_display,
      };
      setDetails(newDetails);
    }
  }, [detailsSearchParams, data, isFetching]);

  const clickCloseButton = async () => {
    await router.push(`/?page=${page}`);
  };

  return (
    <div className={styles.details}>
      {isFetching ? (
        <Loading classname={'loading'} />
      ) : (
        <DetailCard clickCloseButton={clickCloseButton} details={details} />
      )}
    </div>
  );
};

export default Details;
