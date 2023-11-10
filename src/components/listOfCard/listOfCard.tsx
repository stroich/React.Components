import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './listOfCard.module.css';
import { CardData } from '../../API/api.ts';
import {
  DataContext,
  DataContextType,
} from '../../app/Provider/DataProvider.tsx';
import Card from '../Card/Card.tsx';

interface ListOfCardProps {
  handleCardClick: (cardId: number) => void;
  outletRef: React.RefObject<HTMLImageElement>;
}

const ListOfCard: FC<ListOfCardProps> = ({ handleCardClick, outletRef }) => {
  const { page, arrValue } = useContext(DataContext) as DataContextType;
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
      navigate(`/?page=${page}`);
    }
  };

  useEffect(() => {
    const detailsSearchParams = searchParams.get('details');
    if (detailsSearchParams) {
      setIsOpenCard(true);
    } else {
      setIsOpenCard(false);
    }
  }, [searchParams]);

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
