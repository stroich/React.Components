import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './MainPage.module.css';
import { getArrArtWork } from '../API/api.ts';
import { updateArtworks } from '../app/store/actions/arrArtworksSlice.ts';
import { updateMainLoading } from '../app/store/actions/mainLoadingSlice.ts';
import { updatePage, updateTotalPage } from '../app/store/actions/pageSlice.ts';
import { RootState } from '../app/store/store.ts';
import { ErrorButton } from '../components/ErrorButton/ErrorButton.tsx';
import Loading from '../components/Loading/Loading.tsx';
import SearchResultsSection from '../components/SearchResultsSection/SearchResultsSection.tsx';
import Search from '../components/SearchSection/search.tsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.page.page);
  const searchValue = useSelector((state: RootState) => state.search.search);
  const numberOfCard = useSelector(
    (state: RootState) => state.numberOfCard.numberOfCard
  );
  const isLoading = useSelector(
    (state: RootState) => state.mainLoading.isLoading
  );

  const navigate = useNavigate();

  const updateCards = async (currentPage = page) => {
    const result = await getArrArtWork(searchValue, currentPage, numberOfCard);
    dispatch(updateArtworks(result.arrArtWork));
    dispatch(updateTotalPage(result.totalPages));
    dispatch(updateMainLoading(false));
  };

  useEffect(() => {
    updateCards();
  }, [page, numberOfCard]);

  return (
    <div className={styles.container}>
      <Search
        setArrValue={async () => {
          dispatch(updatePage(1));
          navigate(`/`);
          await updateCards();
        }}
      />
      <main>{isLoading ? <Loading /> : <SearchResultsSection />}</main>
      <ErrorButton />
    </div>
  );
};

export default MainPage;
