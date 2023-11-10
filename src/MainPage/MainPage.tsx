import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './MainPage.module.css';
import { getArrArtWork } from '../API/api.ts';
import { DataContext, DataContextType } from '../app/Provider/DataProvider.tsx';
import { ErrorButton } from '../components/ErrorButton/ErrorButton.tsx';
import Loading from '../components/Loading/Loading.tsx';
import SearchResultsSection from '../components/SearchResultsSection/SearchResultsSection.tsx';
import Search from '../components/SearchSection/search.tsx';

const MainPage = () => {
  const { page, searchValue, isLoading, numberOfCard, updateData } = useContext(
    DataContext
  ) as DataContextType;

  const navigate = useNavigate();

  const updateCards = async (currentPage = page) => {
    updateData({ isLoading: true });
    const result = await getArrArtWork(searchValue, currentPage, numberOfCard);
    await updateData({
      arrValue: result.arrArtWork,
      totalPages: result.totalPages,
      isLoading: false,
    });
  };

  useEffect(() => {
    updateCards();
  }, [page, numberOfCard]);

  return (
    <div className={styles.container}>
      <Search
        setArrValue={async () => {
          updateData({ page: 1 });
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
