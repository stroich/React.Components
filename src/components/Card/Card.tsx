import Image from 'next/image';
import { FC } from 'react';

import question from '@/../public/question.jpg';
import { CardData } from '@/types/types.ts';

import styles from './Card.module.css';

interface CardProps {
  artwork: CardData;
  handleCardClick: (n: number) => void;
}
const Card: FC<CardProps> = ({ artwork, handleCardClick }) => {
  return (
    <div
      className={styles.card}
      onClick={() => {
        handleCardClick(artwork.id);
      }}
    >
      <Image src={question} alt={artwork.title} width={250} height={250} />
      <h3 className={styles.cardTitle}>{artwork.title}</h3>
    </div>
  );
};

export default Card;
