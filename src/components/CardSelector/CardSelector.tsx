import { ChangeEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './CardSelector.module.css';
import {
  DataContext,
  DataContextType,
} from '../../app/Provider/DataProvider.tsx';

const CardSelector = () => {
  const { numberOfCard, updateData } = useContext(
    DataContext
  ) as DataContextType;
  const navigate = useNavigate();
  const handleCardPerPageChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    updateData({
      page: 1,
      numberOfCard: parseInt(event.target.value, 10),
    });
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
