import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updatePage } from '@/app/store/actions/pageSlice.ts';
import { RootState } from '@/app/store/store.ts';
import { buildQueryString } from '@/hooks/buildQueryString.ts';

import styles from './ListOfCardWithPagination.module.css';
import Pagination from '../Pagination/Pagination.tsx';
import ListOfCard from '../listOfCard/listOfCard.tsx';

const ListOfCardWithPagination = () => {
  const dispatch = useDispatch();
  const numberOfCard = useSelector(
    (state: RootState) => state.numberOfCard.numberOfCard
  );
  const search = useSelector((state: RootState) => state.search.search);
  const page = useSelector((state: RootState) => state.page.page);
  const arrValue = useSelector(
    (state: RootState) => state.arrArtworks.arrArtworks
  );
  const router = useRouter();

  const handlePageChange = async (newPage: number) => {
    dispatch(updatePage(newPage));
    const url = buildQueryString(search, newPage, numberOfCard);
    await router.push(url);
  };

  const handleCardClick = async (cardId: number) => {
    const url = buildQueryString(search, page, numberOfCard, true);
    await router.push(`/details?${url}&details=${cardId}`);
  };

  return (
    <div className={styles.wrapper}>
      <ListOfCard handleCardClick={handleCardClick} />
      {arrValue.length > 0 ? (
        <Pagination onPageChange={handlePageChange} />
      ) : null}
    </div>
  );
};

export default ListOfCardWithPagination;
