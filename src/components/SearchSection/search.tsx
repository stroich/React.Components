import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './search.module.css';

interface SearchProps {
  setArrValue: () => void;
}
const Search: FC<SearchProps> = ({ setArrValue }) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const searchValue = localStorage.getItem('searchValue');
    if (searchValue) {
      setSearchValue(searchValue);
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.trim();
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
      </div>
    </header>
  );
};

export default Search;
