import { FC } from 'react';
import styles from '../../pages/HookForm/HookForm.module.css';

interface StarsProps {
  passwordStrength: number;
}

const Stars: FC<StarsProps> = ({ passwordStrength }) => {
  return (
    <p className={styles.starWrapper}>
      {' '}
      {[...Array(4)].map((_, index) => (
        <span
          key={index}
          style={{ color: index < passwordStrength ? 'red' : 'gray' }}
        >
          *
        </span>
      ))}
    </p>
  );
};

export default Stars;
