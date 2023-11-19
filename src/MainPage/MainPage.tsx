import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './MainPage.module.css';
import { updateArtworks } from '../app/store/actions/arrArtworksSlice.ts';
import { updateMainLoading } from '../app/store/actions/mainLoadingSlice.ts';
import { updatePage, updateTotalPage } from '../app/store/actions/pageSlice.ts';
import { RootState } from '../app/store/store.ts';
import { ErrorButton } from '../components/ErrorButton/ErrorButton.tsx';
import Loading from '../components/Loading/Loading.tsx';
import SearchResultsSection from '../components/SearchResultsSection/SearchResultsSection.tsx';
import Search from '../components/SearchSection/search.tsx';
import { useCustomArtworkQuery } from '../hooks/useCustomArtworkQuery.ts';
const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className={styles.container}>
      <Search
        setArrValue={async () => {
          dispatch(updatePage(1));
          navigate(`/`);
        }}
      />
      <main>
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
