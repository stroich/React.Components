import { useState } from 'react';

import styles from './ErrorButton.module.css';

type CustomErrorType = Error | null;

export const ErrorButton = () => {
  const [CustomError, setCustomError] = useState<CustomErrorType>(null);
  const handleClick = () => {
    try {
      throw new Error('Error when pressing the button');
    } catch (error) {
      setCustomError(error as Error);
    }
  };

  if (CustomError !== null) {
    throw CustomError;
  }
  return (
    <button className={styles.errorButton} onClick={handleClick}>
      Error checking
    </button>
  );
};
