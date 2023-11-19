import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import styles from './SearchResultsSection.module.css';
import { RootState } from '../../app/store/store.ts';
import ListOfCardWithPagination from '../ListOfCardWithPagination/ListOfCardWithPagination.tsx';

const SearchResultsSection = () => {
  const arrValue = useSelector(
    (state: RootState) => state.arrArtworks.arrArtworks
  );
  const outletRef = useRef<HTMLImageElement>(null);

  return (
    <div className={styles.section}>
      <ListOfCardWithPagination outletRef={outletRef} />
      {arrValue.length > 0 ? (
        <div className={styles.detailsWrapper} ref={outletRef}>
          <Outlet />
        </div>
      ) : null}
    </div>
  );
};

export default SearchResultsSection;
