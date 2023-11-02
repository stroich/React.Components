import { FC } from 'react';
import { CardData } from '../../API/api.ts';
import styles from './listOfCard.module.css';
import Pagination from '../Pagination/Pagination.tsx';

interface ListOfCardProps {
  artworks: Array<CardData>;
  setPage: (page: number) => void;
  page: number;
  totalPages: number;
}

const ListOfCard: FC<ListOfCardProps> = ({
  artworks,
  setPage,
  page,
  totalPages,
}) => {
  return (
    <>
      <div className={styles.cards}>
        {artworks.map((artwork: CardData) => (
          <div className={styles.card} key={artwork.id}>
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
    </>
  );
};

export default ListOfCard;
