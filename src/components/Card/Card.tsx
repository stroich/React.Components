import { FC } from 'react';

import { CardData } from '../../API/api.ts';
import styles from '../listOfCard/listOfCard.module.css';

interface CardProps {
  artwork: CardData;
  setIsOpenCard: (isOpen: boolean) => void;
  handleCardClick: (n: number) => void;
}
const Card: FC<CardProps> = ({ artwork, setIsOpenCard, handleCardClick }) => {
  return (
    <div
      className={styles.card}
      onClick={() => {
        handleCardClick(artwork.id);
        setIsOpenCard(true);
      }}
    >
      <img src={artwork.url} alt={artwork.title} />
      <h3 className={styles.cardTitle}>{artwork.title}</h3>
    </div>
  );
};

export default Card;
