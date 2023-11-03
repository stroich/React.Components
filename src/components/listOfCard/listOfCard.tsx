import { FC, useEffect, useState } from 'react';
import { CardData } from '../../API/api.ts';
import styles from './listOfCard.module.css';
import Pagination from '../Pagination/Pagination.tsx';
import { useSearchParams } from 'react-router-dom';

interface ListOfCardProps {
  artworks: Array<CardData>;
  setPage: (page: number) => void;
  handleCardClick: (cardId: number) => void;
  page: number;
  totalPages: number;
}

const ListOfCard: FC<ListOfCardProps> = ({
  artworks,
  setPage,
  handleCardClick,
  page,
  totalPages,
}) => {
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const detailsSearchParams = searchParams.get('details');
    if (detailsSearchParams) {
      setIsOpenCard(true);
    } else {
      setIsOpenCard(false);
    }
  }, [searchParams]);

  return (
    <div>
      <div
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
