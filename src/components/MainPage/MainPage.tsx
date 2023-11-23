import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateArtworks } from '@/app/store/actions/arrArtworksSlice.ts';
import { updateMainLoading } from '@/app/store/actions/mainLoadingSlice.ts';
import { updatePage, updateTotalPage } from '@/app/store/actions/pageSlice.ts';
import { RootState } from '@/app/store/store.ts';
import { useCustomArtworkQuery } from '@/hooks/useCustomArtworkQuery.ts';

import styles from './MainPage.module.css';
import { ErrorButton } from '../ErrorButton/ErrorButton.tsx';
import Loading from '../Loading/Loading.tsx';
import SearchResultsSection from '../SearchResultsSection/SearchResultsSection.tsx';
import Search from '../SearchSection/search.tsx';

const inter = Inter({ subsets: ['latin'] });

const MainPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const page = useSelector((state: RootState) => state.page.page);
  const searchValue = useSelector((state: RootState) => state.search.search);
  const numberOfCard = useSelector(
    (state: RootState) => state.numberOfCard.numberOfCard
  );

  const { data, isFetching, error } = useCustomArtworkQuery(
    searchValue,
    page,
    numberOfCard
  );

  useEffect(() => {
    if (isFetching) {
      dispatch(updateMainLoading(true));
    }
    if (data) {
      dispatch(updateArtworks(data.arrArtWork));
      dispatch(updateTotalPage(data.totalPages));
      dispatch(updateMainLoading(false));
    }
  }, [data]);

  if (error) {
    return <div className="errorMessage">Something went wrong</div>;
  }

  return (
    <div className={`${styles.container} ${inter.className}`}>
      <Search
        setArrValue={async () => {
          dispatch(updatePage(1));
          await router.push(`/`);
        }}
      />
      <main className={styles.main}>
        {isFetching ? (
          <Loading classname={'loading'} />
        ) : (
          <SearchResultsSection />
        )}
      </main>
      <ErrorButton />
    </div>
  );
};

export default MainPage;
