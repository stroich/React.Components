import React, { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { updateSearch } from '@/app/store/actions/searchSlice.ts';

import styles from './search.module.css';
import CardSelector from '../CardSelector/CardSelector.tsx';

interface SearchProps {
  setArrValue: () => void;
}
const Search: FC<SearchProps> = ({ setArrValue }) => {
  const dispatch = useDispatch();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const clickButton = () => {
    const searchValue = searchInputRef.current?.value;
    if (searchValue) {
      dispatch(updateSearch(searchValue));
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
          ref={searchInputRef}
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
