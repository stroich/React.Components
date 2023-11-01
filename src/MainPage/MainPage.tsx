import { useEffect, useState } from 'react';
import { getArrArtWork, CardData } from '../API/api.ts';
import Search from '../components/SearchSection/search.tsx';
import ListOfCard from '../components/listOfCard/listOfCard.tsx';
import { ErrorButton } from '../components/ErrorButton/ErrorButton.tsx';
import styles from './MainPage.module.css';

const MainPage = () => {
  const [arrValue, setArrValue] = useState<Array<CardData>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    updateData();
  }, []);

  const updateData = async () => {
    setIsLoading(true);
    const searchValue = localStorage.getItem('searchValue');
    const queryValue = searchValue || ' ';
    const arrValue = await getArrArtWork(queryValue);
    setArrValue(arrValue);
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <Search setArrValue={updateData} />
      <main>
        {isLoading ? (
          <div className={styles.loading}>loading...</div>
        ) : (
          <ListOfCard artworks={arrValue} />
        )}
      </main>
      <ErrorButton />
    </div>
  );
};

export default MainPage;
