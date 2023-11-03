import styles from './Details.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getDetails } from '../../API/api.ts';
import Loading from '../Loading/Loading.tsx';
import closeIcon from '../../../public/close-icon.svg';

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
    const newDetails = await getDetails(cardId);
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
        <div>
          <img
            className={styles.closeIcon}
            src={closeIcon}
            alt={'close'}
            onClick={clickCloseButton}
          />
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
