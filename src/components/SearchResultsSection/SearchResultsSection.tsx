import { useContext, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import styles from './SearchResultsSection.module.css';
import ListOfCard from '../listOfCard/listOfCard.tsx';
import {
  DataContext,
  DataContextType,
} from '../../app/Provider/DataProvider.tsx';

const SearchResultsSection = () => {
  const { page, setPage } = useContext(DataContext) as DataContextType;
  const navigate = useNavigate();
  const outletRef = useRef<HTMLImageElement>(null);

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    navigate(`/?page=${newPage}`);
  };

  const handleCardClick = (cardId: number) => {
    navigate(`/details?page=${page}&details=${cardId}`);
  };

  return (
    <div className={styles.wrapper}>
      <ListOfCard
        handlePageChange={handlePageChange}
        handleCardClick={handleCardClick}
        outletRef={outletRef}
      />
      <div className={styles.detailsWrapper} ref={outletRef}>
        <Outlet />
      </div>
    </div>
  );
};

export default SearchResultsSection;
