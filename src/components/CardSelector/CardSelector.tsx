import { ChangeEvent, useContext } from 'react';

import styles from './CardSelector.module.css';
import {
  DataContext,
  DataContextType,
} from '../../app/Provider/DataProvider.tsx';

const CardSelector = () => {
  const { numberOfCard, setNumberOfCard } = useContext(
    DataContext
  ) as DataContextType;
  const handleCardPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setNumberOfCard(parseInt(event.target.value, 10));
  };

  return (
    <div className={styles.wrapperSelector}>
      <select
        className={styles.select}
        value={numberOfCard}
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
