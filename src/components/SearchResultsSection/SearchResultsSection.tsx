import { useContext, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './SearchResultsSection.module.css';
import {
  DataContext,
  DataContextType,
} from '../../app/Provider/DataProvider.tsx';
import ListOfCardWithPagination from '../ListOfCardWithPagination/ListOfCardWithPagination.tsx';

const SearchResultsSection = () => {
  const { arrValue } = useContext(DataContext) as DataContextType;
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
