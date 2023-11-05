import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import { getArrArtWork, CardData } from '../API/api.ts';
import Search from '../components/SearchSection/search.tsx';
import ListOfCard from '../components/listOfCard/listOfCard.tsx';
import { ErrorButton } from '../components/ErrorButton/ErrorButton.tsx';
import styles from './MainPage.module.css';
import Loading from '../components/Loading/Loading.tsx';

const MainPage = () => {
  const [arrValue, setArrValue] = useState<Array<CardData>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfCard, setNumberOfCard] = useState(8);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const pageSearchParams = searchParams.get('page');
    if (pageSearchParams) {
      setPage(+pageSearchParams);
      updateData(+pageSearchParams);
    } else {
      updateData();
    }
  }, []);

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

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    navigate(`/?page=${newPage}`);
    await updateData(newPage);
  };

  const handleCardClick = (cardId: number) => {
    navigate(`/details?page=${page}&details=${cardId}`);
  };

  return (
    <div className={styles.container}>
      <Search
        setCardsPerPage={setNumberOfCard}
        cardsPerPage={numberOfCard}
        setArrValue={async () => {
          setPage(1);
          setSearchParams(``);
          await updateData(1);
        }}
      />
      <main>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.wrapper}>
            <ListOfCard
              artworks={arrValue}
              setPage={handlePageChange}
              page={page}
              totalPages={totalPages}
              handleCardClick={handleCardClick}
            />
            <Outlet />
          </div>
        )}
      </main>
      <ErrorButton />
    </div>
  );
};

export default MainPage;
