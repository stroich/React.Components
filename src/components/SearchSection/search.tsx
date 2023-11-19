import { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './search.module.css';
import { updateSearch } from '../../app/store/actions/searchSlice.ts';
import { RootState } from '../../app/store/store.ts';
import CardSelector from '../CardSelector/CardSelector.tsx';

interface SearchProps {
  setArrValue: () => void;
}
const Search: FC<SearchProps> = ({ setArrValue }) => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.search.search);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    dispatch(updateSearch(search));
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
