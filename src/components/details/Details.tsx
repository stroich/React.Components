import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { RootState } from '@/app/store/store.ts';
import { buildQueryString } from '@/hooks/buildQueryString.ts';

import styles from './Details.module.css';
import DetailCard from '../DetailCard/DetailCard.tsx';

const Details = () => {
  const router = useRouter();
  const details = useSelector((state: RootState) => state.details.details);
  const numberOfCard = useSelector(
    (state: RootState) => state.numberOfCard.numberOfCard
  );
  const search = useSelector((state: RootState) => state.search.search);
  const page = useSelector((state: RootState) => state.page.page);

  const clickCloseButton = async () => {
    const url = buildQueryString(search, page, numberOfCard);
    if (url === '/?') {
      await router.push('/');
    } else {
      await router.push(url);
    }
  };

  return (
    <div className={styles.details}>
      <DetailCard clickCloseButton={clickCloseButton} details={details} />
    </div>
  );
};

export default Details;
