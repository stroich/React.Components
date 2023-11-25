import { useRouter } from 'next/router';
import { FC } from 'react';

import Details from '@/components/details/Details.tsx';
import { Artwork } from '@/types/types.ts';

import styles from './SearchResultsSection.module.css';
import ListOfCard from '../ListOfCardWithPagination/ListOfCardWithPagination.tsx';

interface SearchResultsSectionProps {
  arrArtworks: Array<Artwork>;
}

const SearchResultsSection: FC<SearchResultsSectionProps> = ({
  arrArtworks,
}) => {
  const router = useRouter();
  const { query } = router;

  return (
    <div className={styles.section}>
      <ListOfCard arrArtworks={arrArtworks} />
      {arrArtworks.length > 0 ? (
        <div className={styles.detailsWrapper}>
          {query.details && <Details />}
        </div>
      ) : null}
    </div>
  );
};

export default SearchResultsSection;
