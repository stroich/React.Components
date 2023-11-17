import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './Details.module.css';
import { useGetArtworkDetailsQuery } from '../../app/store/api/artwork.api.ts';
import DetailCard from '../DetailCard/DetailCard.tsx';
import Loading from '../Loading/Loading.tsx';

const Details = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [details, setDetails] = useState({
    title: '',
    description: '',
    data: '',
    culture: '',
  });
  const detailsSearchParams = searchParams.get('details') as string;
  const { data, error, isFetching } = useGetArtworkDetailsQuery(
    +detailsSearchParams
  );

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

  const clickCloseButton = () => {
    navigate(`/?page=${page}`);
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
