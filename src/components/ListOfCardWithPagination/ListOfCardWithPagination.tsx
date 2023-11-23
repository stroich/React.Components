import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateMainLoading } from '@/app/store/actions/mainLoadingSlice.ts';
import { updatePage } from '@/app/store/actions/pageSlice.ts';
import { RootState } from '@/app/store/store.ts';

import styles from './ListOfCardWithPagination.module.css';
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
  const router = useRouter();

  const handlePageChange = async (newPage: number) => {
    dispatch(updateMainLoading(true));
    dispatch(updatePage(newPage));
    await router.push(`/?page=${newPage}`);
  };

  const handleCardClick = async (cardId: number) => {
    await router.push(`/details?page=${page}&details=${cardId}`);
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
