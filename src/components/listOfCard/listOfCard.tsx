import { useRouter } from 'next/router';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/app/store/store.ts';
import { CardData } from '@/types/types.ts';

import styles from './listOfCard.module.css';
import Card from '../Card/Card.tsx';

interface ListOfCardProps {
  handleCardClick: (cardId: number) => void;
  outletRef: React.RefObject<HTMLImageElement>;
}

const ListOfCard: FC<ListOfCardProps> = ({ handleCardClick, outletRef }) => {
  const page = useSelector((state: RootState) => state.page.page);
  const arrValue = useSelector(
    (state: RootState) => state.arrArtworks.arrArtworks
  );
  const [isOpenCard, setIsOpenCard] = useState(false);
  const router = useRouter();
  const { query } = router;
  const cardRef = useRef<HTMLImageElement>(null);

  const handleClickOutside = (event: Event) => {
    const isTarget = event.target === event.currentTarget;
    if (
      !isTarget &&
      outletRef.current &&
      !outletRef.current.contains(event.target as Node) &&
      cardRef.current &&
      !cardRef.current.contains(event.target as Node)
    ) {
      router.push(`/?page=${page}`);
    }
  };

  useEffect(() => {
    const detailsSearchParams = query.details;
    if (detailsSearchParams) {
      setIsOpenCard(true);
    } else {
      setIsOpenCard(false);
    }
  }, [query]);

  useEffect(() => {
    if (isOpenCard) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpenCard]);

  return (
    <>
      {arrValue.length === 0 ? (
        <div className={styles.message}>Nothing found</div>
      ) : (
        <div
          ref={cardRef}
          className={`${styles.cards} ${
            isOpenCard ? styles.cardsOpenDetails : ''
          }`}
        >
          {arrValue.map((artwork: CardData) => (
            <Card
              artwork={artwork}
              key={artwork.id}
              setIsOpenCard={setIsOpenCard}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ListOfCard;
