import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './search.module.css';
import CardSelector from '../CardSelector/CardSelector.tsx';

interface SearchProps {
  cardsPerPage: number;
  setCardsPerPage: (cardsPerPage: number) => void;
  setArrValue: () => void;
}
const Search: FC<SearchProps> = ({
  setArrValue,
  setCardsPerPage,
  cardsPerPage,
}) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const searchValue = localStorage.getItem('searchValue');
    if (searchValue) {
      setSearchValue(searchValue);
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };

  const clickButton = () => {
    const searchValueInLocalStorage = localStorage.getItem('searchValue');
    if (searchValue !== searchValueInLocalStorage) {
      localStorage.setItem('searchValue', searchValue);
      setArrValue();
    }
  };

  return (
    <header>
      <h1>Works of art from the Art Institute of Chicago</h1>
      <div className={styles.search}>
        <input
          className={styles.searchInput}
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Enter a search query"
        />
        <button className={styles.searchButton} onClick={clickButton}>
          Search
        </button>
        <CardSelector
          setCardsPerPage={setCardsPerPage}
          cardsPerPage={cardsPerPage}
        />
      </div>
    </header>
  );
};

export default Search;
