import { useRouter } from 'next/router';
import React, { FC, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updatePage } from '@/app/store/actions/pageSlice.ts';
import { RootState } from '@/app/store/store.ts';
import Card from '@/components/Card/Card.tsx';
import { buildQueryString } from '@/hooks/buildQueryString.ts';
import { Artwork, CardData } from '@/types/types.ts';

import styles from './ListOfCardWithPagination.module.css';
import Pagination from '../Pagination/Pagination.tsx';

interface ListOfCardProps {
  arrArtworks: Array<Artwork>;
}

const ListOfCard: FC<ListOfCardProps> = ({ arrArtworks }) => {
  const dispatch = useDispatch();
  const cardRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const { query } = router;
  const numberOfCard = useSelector(
    (state: RootState) => state.numberOfCard.numberOfCard
  );
  const search = useSelector((state: RootState) => state.search.search);
  const page = useSelector((state: RootState) => state.page.page);

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
      {arrArtworks.length === 0 ? (
        <div className={styles.message}>Nothing found</div>
      ) : (
        <div
          ref={cardRef}
          className={query.details ? styles.cardsOpenDetails : styles.cards}
        >
          {arrArtworks.map((artwork: CardData) => (
            <Card
              artwork={artwork}
              key={artwork.id}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
      )}
      {arrArtworks.length > 0 ? (
        <Pagination onPageChange={handlePageChange} />
      ) : null}
    </div>
  );
};

export default ListOfCard;
