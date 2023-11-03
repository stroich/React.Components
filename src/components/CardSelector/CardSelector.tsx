import { ChangeEvent, FC } from 'react';
import styles from './CardSelector.module.css';

interface CardSelectorProps {
  cardsPerPage: number;
  setCardsPerPage: (cardsPerPage: number) => void;
}

const CardSelector: FC<CardSelectorProps> = ({
  setCardsPerPage,
  cardsPerPage,
}) => {
  const handleCardPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCardsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <div className={styles.wrapperSelector}>
      <select
        className={styles.select}
        value={cardsPerPage}
        onChange={handleCardPerPageChange}
      >
        <option value={4}> 4</option>
        <option value={8}> 8</option>
        <option value={12}>12</option>
        <option value={16}>16</option>
      </select>
    </div>
  );
};

export default CardSelector;
