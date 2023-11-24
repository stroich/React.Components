import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { updatePage } from '@/app/store/actions/pageSlice.ts';

import styles from './MainPage.module.css';
import { ErrorButton } from '../ErrorButton/ErrorButton.tsx';
import SearchResultsSection from '../SearchResultsSection/SearchResultsSection.tsx';
import Search from '../SearchSection/search.tsx';

const inter = Inter({ subsets: ['latin'] });

const MainPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className={`${styles.container} ${inter.className}`}>
      <Search
        setArrValue={async () => {
          dispatch(updatePage(1));
          await router.push(`/`);
        }}
      />
      <main className={styles.main}>
        <SearchResultsSection />
      </main>
      <ErrorButton />
    </div>
  );
};

export default MainPage;
