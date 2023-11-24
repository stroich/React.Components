import { useRouter } from 'next/router';
import React, { FC, useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/app/store/store.ts';
import { CardData } from '@/types/types.ts';

import styles from './listOfCard.module.css';
import Card from '../Card/Card.tsx';

interface ListOfCardProps {
  handleCardClick: (cardId: number) => void;
}

const ListOfCard: FC<ListOfCardProps> = ({ handleCardClick }) => {
  const cardRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const { query } = router;
  const arrValue = useSelector(
    (state: RootState) => state.arrArtworks.arrArtworks
  );

  return (
    <>
      {arrValue.length === 0 ? (
        <div className={styles.message}>Nothing found</div>
      ) : (
        <div
          ref={cardRef}
          className={query.details ? styles.cardsOpenDetails : styles.cards}
        >
          {arrValue.map((artwork: CardData) => (
            <Card
              artwork={artwork}
              key={artwork.id}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ListOfCard;
