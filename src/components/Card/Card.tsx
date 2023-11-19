import { FC } from 'react';

import { useGetArtworkImageQuery } from '../../app/store/api/artwork.api.ts';
import { CardData } from '../../types/types.ts';
import Loading from '../Loading/Loading.tsx';
import styles from '../listOfCard/listOfCard.module.css';

interface CardProps {
  artwork: CardData;
  setIsOpenCard: (isOpen: boolean) => void;
  handleCardClick: (n: number) => void;
}
const Card: FC<CardProps> = ({ artwork, setIsOpenCard, handleCardClick }) => {
  const { data, error, isLoading } = useGetArtworkImageQuery(artwork.id);
  let urlImage;
  if (data) {
    urlImage = `https://www.artic.edu/iiif/2/${data.data.image_id}/full/200,/0/default.jpg`;
  }

  if (error) {
    throw error;
  }
  return (
    <div
      className={styles.card}
      onClick={() => {
        handleCardClick(artwork.id);
        setIsOpenCard(true);
      }}
    >
      {isLoading ? (
        <Loading classname={'loadingCard'} />
      ) : (
        <img src={urlImage} alt={artwork.title} />
      )}
      <h3 className={styles.cardTitle}>{artwork.title}</h3>
    </div>
  );
};

export default Card;
