import { ChangeEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './CardSelector.module.css';
import {
  DataContext,
  DataContextType,
} from '../../app/Provider/DataProvider.tsx';

const CardSelector = () => {
  const { numberOfCard, setNumberOfCard, setPage } = useContext(
    DataContext
  ) as DataContextType;
  const navigate = useNavigate();
  const handleCardPerPageChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    await setNumberOfCard(parseInt(event.target.value, 10));
    await setPage(1);
    await navigate('/');
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
