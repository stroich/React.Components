import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './Details.module.css';
import { getDetailsAboutTheCard } from '../../API/api.ts';
import DetailCard from '../DetailCard/DetailCard.tsx';
import Loading from '../Loading/Loading.tsx';

const Details = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({
    title: '',
    description: '',
    data: '',
    culture: '',
  });

  const updateData = async (cardId: string) => {
    const newDetails = await getDetailsAboutTheCard(cardId);
    setDetails(newDetails);
  };

  useEffect(() => {
    const detailsSearchParams = searchParams.get('details');
    if (detailsSearchParams) {
      updateData(detailsSearchParams).then(() => {
        setIsLoading(false);
      });
    }
  }, [searchParams]);

  const clickCloseButton = () => {
    navigate(`/?page=${page}`);
  };

  return (
    <div className={styles.details}>
      {isLoading ? (
        <Loading />
      ) : (
        <DetailCard clickCloseButton={clickCloseButton} details={details} />
      )}
    </div>
  );
};

export default Details;
