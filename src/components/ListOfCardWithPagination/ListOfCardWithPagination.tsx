import React, { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Pagination from '../Pagination/Pagination.tsx';
import ListOfCard from '../listOfCard/listOfCard.tsx';
import {
  DataContext,
  DataContextType,
} from '../../app/Provider/DataProvider.tsx';

interface ListOfCardWithPaginationProps {
  outletRef: React.RefObject<HTMLImageElement>;
}

const ListOfCardWithPagination: FC<ListOfCardWithPaginationProps> = ({
  outletRef,
}) => {
  const { page, setPage } = useContext(DataContext) as DataContextType;
  const navigate = useNavigate();

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    navigate(`/?page=${newPage}`);
  };

  const handleCardClick = (cardId: number) => {
    navigate(`/details?page=${page}&details=${cardId}`);
  };

  return (
    <div>
      <ListOfCard handleCardClick={handleCardClick} outletRef={outletRef} />
      <Pagination onPageChange={handlePageChange} />
    </div>
  );
};

export default ListOfCardWithPagination;
