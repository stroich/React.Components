import React, { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Pagination from '../Pagination/Pagination.tsx';
import ListOfCard from '../listOfCard/listOfCard.tsx';
import {
  DataContext,
  DataContextType,
} from '../../app/Provider/DataProvider.tsx';
import styles from './ListOfCardWithPagination.module.css';

interface ListOfCardWithPaginationProps {
  outletRef: React.RefObject<HTMLImageElement>;
}

const ListOfCardWithPagination: FC<ListOfCardWithPaginationProps> = ({
  outletRef,
}) => {
  const { page, arrValue, updateData } = useContext(
    DataContext
  ) as DataContextType;
  const navigate = useNavigate();

  const handlePageChange = async (newPage: number) => {
    updateData({ page: newPage });
    navigate(`/?page=${newPage}`);
  };

  const handleCardClick = (cardId: number) => {
    navigate(`/details?page=${page}&details=${cardId}`);
  };

  return (
    <div className={styles.wrapper}>
      <ListOfCard handleCardClick={handleCardClick} outletRef={outletRef} />
      {arrValue.length > 0 ? (
        <Pagination onPageChange={handlePageChange} />
      ) : null}
    </div>
  );
};

export default ListOfCardWithPagination;
