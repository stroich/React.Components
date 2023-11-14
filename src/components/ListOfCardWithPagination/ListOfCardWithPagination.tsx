import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './ListOfCardWithPagination.module.css';
import { updatePage } from '../../app/store/actions/pageSlice.ts';
import { RootState } from '../../app/store/store.ts';
import Pagination from '../Pagination/Pagination.tsx';
import ListOfCard from '../listOfCard/listOfCard.tsx';

interface ListOfCardWithPaginationProps {
  outletRef: React.RefObject<HTMLImageElement>;
}

const ListOfCardWithPagination: FC<ListOfCardWithPaginationProps> = ({
  outletRef,
}) => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.page.page);
  const arrValue = useSelector(
    (state: RootState) => state.arrArtworks.arrArtworks
  );
  const navigate = useNavigate();

  const handlePageChange = async (newPage: number) => {
    dispatch(updatePage(newPage));
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
