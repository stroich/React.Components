import { Inter } from 'next/font/google';
import { FC } from 'react';

import { Artwork } from '@/types/types.ts';

import styles from './MainPage.module.css';
import { ErrorButton } from '../ErrorButton/ErrorButton.tsx';
import SearchResultsSection from '../SearchResultsSection/SearchResultsSection.tsx';
import Search from '../SearchSection/search.tsx';

const inter = Inter({ subsets: ['latin'] });

interface MainPageProps {
  arrArtworks: Array<Artwork>;
}

const MainPage: FC<MainPageProps> = ({ arrArtworks }) => {
  return (
    <div className={`${styles.container} ${inter.className}`}>
      <Search />
      <main className={styles.main}>
        <SearchResultsSection arrArtworks={arrArtworks} />
      </main>
      <ErrorButton />
    </div>
  );
};

export default MainPage;
