import { FC, useContext } from 'react';

import styles from './Pagination.module.css';
import { generatePageButtons } from './generatePageButtons.ts';
import {
  DataContext,
  DataContextType,
} from '../../app/Provider/DataProvider.tsx';

interface PaginationProps {
  onPageChange: (i: number) => void;
}
const Pagination: FC<PaginationProps> = ({ onPageChange }) => {
  const { page, totalPages } = useContext(DataContext) as DataContextType;
  const pageButtons = generatePageButtons(page, totalPages);

  return (
    <div className={styles.pagination}>
      <div>
        <button onClick={() => onPageChange(1)} disabled={page === 1}>
          {'<<'}
        </button>
        {pageButtons.map((numberButton) => (
          <button
            key={numberButton}
            onClick={() => onPageChange(numberButton)}
            disabled={numberButton === page}
          >
            {numberButton}
          </button>
        ))}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
