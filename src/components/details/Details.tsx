import styles from './Details.module.css';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getDetails } from '../../API/api.ts';
import Loading from '../Loading/Loading.tsx';

const Details = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({
    title: '',
    description: '',
    data: '',
    culture: '',
  });

  const updateData = async (cardId: string) => {
    const newDetails = await getDetails(cardId);
    setDetails(newDetails);
  };

  useEffect(() => {
    const detailsSearchParams = searchParams.get('details');

    if (detailsSearchParams) {
      updateData(detailsSearchParams);
    }
    setIsLoading(false);
  }, [searchParams]);

  return (
    <div className={styles.details}>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h2>{details.title}</h2>
          <h3>Year: {details.data}</h3>
          <h4>Culture: {details.culture}</h4>
          {React.createElement('div', {
            dangerouslySetInnerHTML: { __html: details.description },
          })}
        </div>
      )}
    </div>
  );
};

export default Details;
