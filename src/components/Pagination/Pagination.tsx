import { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/app/store/store.ts';

import styles from './Pagination.module.css';
import { generatePageButtons } from './generatePageButtons.ts';

interface PaginationProps {
  onPageChange: (i: number) => void;
}
const Pagination: FC<PaginationProps> = ({ onPageChange }) => {
  const page = useSelector((state: RootState) => state.page.page);
  const totalPages = useSelector((state: RootState) => state.page.totalPage);
  const pageButtons = generatePageButtons(page, totalPages);

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationWrapper}>
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
