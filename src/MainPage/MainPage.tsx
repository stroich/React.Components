import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import { getArrArtWork, CardData } from '../API/api.ts';
import Search from '../components/SearchSection/search.tsx';
import { ErrorButton } from '../components/ErrorButton/ErrorButton.tsx';
import styles from './MainPage.module.css';
import Loading from '../components/Loading/Loading.tsx';
import SearchResultsSection from '../components/SearchResultsSection/SearchResultsSection.tsx';

const MainPage = () => {
  const [arrValue, setArrValue] = useState<Array<CardData>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfCard, setNumberOfCard] = useState(8);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const pageSearchParams = searchParams.get('page');
    if (pageSearchParams) {
      setPage(+pageSearchParams);
      updateData(+pageSearchParams);
    } else {
      updateData();
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
    navigate(`/`);
    updateData(1);
  }, [numberOfCard]);

  const updateData = async (currentPage = page) => {
    setIsLoading(true);
    const searchValue = localStorage.getItem('searchValue');
    const queryValue = searchValue || ' ';
    const result = await getArrArtWork(queryValue, currentPage, numberOfCard);
    setArrValue(result.arrArtWork);
    setTotalPages(result.totalPages);
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <Search
        setCardsPerPage={setNumberOfCard}
        cardsPerPage={numberOfCard}
        setArrValue={async () => {
          setPage(1);
          navigate(`/`);
        }}
      />
      <main>
        {isLoading ? (
          <Loading />
        ) : (
          <SearchResultsSection
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            arrValue={arrValue}
          />
        )}
      </main>
      <ErrorButton />
    </div>
  );
};

export default MainPage;
