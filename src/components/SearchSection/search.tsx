import { useRouter } from 'next/router';
import React, { ChangeEvent, FC, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateSearch } from '@/app/store/actions/searchSlice.ts';
import { RootState } from '@/app/store/store.ts';
import { buildQueryString } from '@/hooks/buildQueryString.ts';

import styles from './search.module.css';
import CardSelector from '../CardSelector/CardSelector.tsx';

interface SearchProps {
  setArrValue: () => void;
}
const Search: FC<SearchProps> = ({ setArrValue }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const numberOfCard = useSelector(
    (state: RootState) => state.numberOfCard.numberOfCard
  );
  const searchValue = useSelector((state: RootState) => state.search.search);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearchValue] = useState(searchValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };

  const clickButton = async () => {
    const searchValue = searchInputRef.current?.value;
    if (searchValue !== undefined) {
      dispatch(updateSearch(searchValue));
      localStorage.setItem('searchValue', searchValue);
      setArrValue();
      const url = buildQueryString(searchValue, 1, numberOfCard);
      await router.push(url);
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
          value={search}
          onChange={handleInputChange}
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
