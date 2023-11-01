import { FC } from 'react';
import { CardData } from '../../API/api.ts';
import styles from './listOfCard.module.css';

interface ListOfCardProps {
  artworks: Array<CardData>;
}

const ListOfCard: FC<ListOfCardProps> = ({ artworks }) => {
  return (
    <div className={styles.cards}>
      {artworks.map((artwork: CardData) => (
        <div className={styles.card} key={artwork.id}>
          <img src={artwork.url} alt={artwork.title} />
          <h3 className={styles.cardTitle}>{artwork.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ListOfCard;
