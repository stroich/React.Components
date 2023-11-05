import { FC } from 'react';

import styles from './Pagination.module.css';
import { generatePageButtons } from './generatePageButtons.ts';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (i: number) => void;
}
const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageButtons = generatePageButtons(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <div>
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          {'<<'}
        </button>
        {pageButtons.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
