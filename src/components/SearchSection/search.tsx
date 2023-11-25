import { useRouter } from 'next/router';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updatePage } from '@/app/store/actions/pageSlice.ts';
import { updateSearch } from '@/app/store/actions/searchSlice.ts';
import { RootState } from '@/app/store/store.ts';
import { buildQueryString } from '@/hooks/buildQueryString.ts';

import styles from './search.module.css';
import CardSelector from '../CardSelector/CardSelector.tsx';

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const numberOfCard = useSelector(
    (state: RootState) => state.numberOfCard.numberOfCard
  );
  const searchValue = useSelector((state: RootState) => state.search.search);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearchValue] = useState(searchValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.trim();
    setSearchValue(searchValue);
  };

  const clickButton = async () => {
    const searchValue = searchInputRef.current?.value.trim();
    if (searchValue !== undefined) {
      dispatch(updateSearch(searchValue));
      localStorage.setItem('searchValue', searchValue);
      dispatch(updatePage(1));
      console.log(searchValue);
      const url = buildQueryString(searchValue, 1, numberOfCard);
      if (url === '/?') {
        await router.push('/');
      } else {
        await router.push(url);
      }
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
