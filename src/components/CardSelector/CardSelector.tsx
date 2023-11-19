import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './CardSelector.module.css';
import { updateNumberOfCard } from '../../app/store/actions/numberOfCardSlice.ts';
import { updatePage } from '../../app/store/actions/pageSlice.ts';
import { RootState } from '../../app/store/store.ts';

const CardSelector = () => {
  const dispatch = useDispatch();
  const numberOfCard = useSelector(
    (state: RootState) => state.numberOfCard.numberOfCard
  );
  const navigate = useNavigate();
  const handleCardPerPageChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const newNumberOfCards = parseInt(event.target.value, 10);
    dispatch(updatePage(1));
    dispatch(updateNumberOfCard(newNumberOfCards));
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
