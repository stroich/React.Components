import { useEffect, useState } from 'react';
import { getArrArtWork, CardData } from '../API/api.ts';
import Search from '../components/SearchSection/search.tsx';
import ListOfCard from '../components/listOfCard/listOfCard.tsx';
import { ErrorButton } from '../components/ErrorButton/ErrorButton.tsx';
import styles from './MainPage.module.css';
import { useLocation, useSearchParams } from 'react-router-dom';

const MainPage = () => {
  const location = useLocation();
  const [arrValue, setArrValue] = useState<Array<CardData>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const match = location.search.match(/\d+/);
    if (match) {
      const number = match[0];
      setPage(+number);
      updateData(+number);
    } else {
      updateData();
    }
  }, [location.search]);

  const updateData = async (currentPage = page) => {
    setIsLoading(true);
    const searchValue = localStorage.getItem('searchValue');
    const queryValue = searchValue || ' ';
    const result = await getArrArtWork(queryValue, currentPage);
    setArrValue(result.arrArtWork);
    setTotalPages(result.totalPages);
    setIsLoading(false);
  };

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    setSearchParams(`page=${newPage}`);
    await updateData(newPage);
  };

  return (
    <div className={styles.container}>
      <Search
        setArrValue={async () => {
          setPage(1);
          setSearchParams(``);
          await updateData(1);
        }}
      />
      <main>
        {isLoading ? (
          <div className={styles.loading}>loading...</div>
        ) : (
          <ListOfCard
            artworks={arrValue}
            setPage={handlePageChange}
            page={page}
            totalPages={totalPages}
          />
        )}
      </main>
      <ErrorButton />
    </div>
  );
};

export default MainPage;
