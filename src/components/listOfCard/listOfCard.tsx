import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CardData } from '../../API/api.ts';
import styles from './listOfCard.module.css';
import Pagination from '../Pagination/Pagination.tsx';

interface ListOfCardProps {
  artworks: Array<CardData>;
  setPage: (page: number) => void;
  handleCardClick: (cardId: number) => void;
  page: number;
  totalPages: number;
  outletRef: React.RefObject<HTMLImageElement>;
}

const ListOfCard: FC<ListOfCardProps> = ({
  artworks,
  setPage,
  handleCardClick,
  page,
  totalPages,
  outletRef,
}) => {
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
    <div>
      <div
        ref={cardRef}
        className={`${styles.cards} ${
          isOpenCard ? styles.cardsOpenDetails : ''
        }`}
      >
        {artworks.map((artwork: CardData) => (
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
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ListOfCard;
