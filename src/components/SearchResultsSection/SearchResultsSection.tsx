import { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './SearchResultsSection.module.css';
import ListOfCardWithPagination from '../ListOfCardWithPagination/ListOfCardWithPagination.tsx';

const SearchResultsSection = () => {
  const outletRef = useRef<HTMLImageElement>(null);

  return (
    <div className={styles.wrapper}>
      <ListOfCardWithPagination outletRef={outletRef} />
      <div className={styles.detailsWrapper} ref={outletRef}>
        <Outlet />
      </div>
    </div>
  );
};

export default SearchResultsSection;
