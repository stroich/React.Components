import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { RootState } from '@/app/store/store.ts';
import Details from '@/components/details/Details.tsx';

import styles from './SearchResultsSection.module.css';
import ListOfCardWithPagination from '../ListOfCardWithPagination/ListOfCardWithPagination.tsx';

const SearchResultsSection = () => {
  const arrValue = useSelector(
    (state: RootState) => state.arrArtworks.arrArtworks
  );
  const router = useRouter();
  const { query } = router;

  return (
    <div className={styles.section}>
      <ListOfCardWithPagination />
      {arrValue.length > 0 ? (
        <div className={styles.detailsWrapper}>
          {query.details && <Details />}
        </div>
      ) : null}
    </div>
  );
};

export default SearchResultsSection;
