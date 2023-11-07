import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Search from '../components/SearchSection/search.tsx';
import { ErrorButton } from '../components/ErrorButton/ErrorButton.tsx';
import styles from './MainPage.module.css';
import Loading from '../components/Loading/Loading.tsx';
import SearchResultsSection from '../components/SearchResultsSection/SearchResultsSection.tsx';
import { DataContext, DataContextType } from '../app/Provider/DataProvider.tsx';

const MainPage = () => {
  const { page, setPage, updateData, isLoading, numberOfCard } = useContext(
    DataContext
  ) as DataContextType;

  const navigate = useNavigate();

  useEffect(() => {
    updateData();
  }, [page, numberOfCard]);

  return (
    <div className={styles.container}>
      <Search
        setArrValue={async () => {
          setPage(1);
          navigate(`/`);
          await updateData();
        }}
      />
      <main>{isLoading ? <Loading /> : <SearchResultsSection />}</main>
      <ErrorButton />
    </div>
  );
};

export default MainPage;
