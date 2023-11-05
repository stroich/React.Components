import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import styles from '../../MainPage/MainPage.module.css';
import ListOfCard from '../listOfCard/listOfCard.tsx';
import { CardData } from '../../API/api.ts';

interface SearchResultsSectionProps {
  page: number;
  totalPages: number;
  setPage: (n: number) => void;
  arrValue: Array<CardData>;
}

const SearchResultsSection: FC<SearchResultsSectionProps> = ({
  page,
  setPage,
  totalPages,
  arrValue,
}) => {
  const navigate = useNavigate();
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
        artworks={arrValue}
        setPage={handlePageChange}
        page={page}
        totalPages={totalPages}
        handleCardClick={handleCardClick}
      />
      <Outlet />
    </div>
  );
};

export default SearchResultsSection;
