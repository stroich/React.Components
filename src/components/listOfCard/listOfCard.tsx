import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CardData } from '../../API/api.ts';
import styles from './listOfCard.module.css';
import {
  DataContext,
  DataContextType,
} from '../../app/Provider/DataProvider.tsx';

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
    <div
      ref={cardRef}
      className={`${styles.cards} ${isOpenCard ? styles.cardsOpenDetails : ''}`}
    >
      {arrValue.map((artwork: CardData) => (
        <div
          className={styles.card}
          key={artwork.id}
          onClick={() => {
            handleCardClick(artwork.id);
            setIsOpenCard(true);
          }}
        >
          <img src={artwork.url} alt={artwork.title} />
          <h3 className={styles.cardTitle}>{artwork.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ListOfCard;
