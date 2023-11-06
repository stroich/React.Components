import { ChangeEvent, FC, useContext, useEffect } from 'react';

import styles from './search.module.css';
import CardSelector from '../CardSelector/CardSelector.tsx';
import {
  DataContext,
  DataContextType,
} from '../../app/Provider/DataProvider.tsx';

interface SearchProps {
  setArrValue: () => void;
}
const Search: FC<SearchProps> = ({ setArrValue }) => {
  const { setSearchValue, searchValue } = useContext(
    DataContext
  ) as DataContextType;

  useEffect(() => {
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
        <CardSelector />
      </div>
    </header>
  );
};

export default Search;
