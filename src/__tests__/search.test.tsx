import { render, fireEvent } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';

import {
  initialState,
  mockStoreWithoutFetch,
} from '../__mocks__/mockStoreWithoutFetch.tsx';
import Search from '../components/SearchSection/search.tsx';

jest.mock('next/router', () => require('next-router-mock'));

test('clicking the Search button saves the entered value to the local storage', () => {
  fetchMock.enableMocks();
  localStorage.clear();
  const { getByText, getByPlaceholderText } = render(
    <Provider store={mockStoreWithoutFetch(initialState)}>
      <Search />
    </Provider>
  );
  const inputElement = getByPlaceholderText('Enter a search query');
  fireEvent.change(inputElement, { target: { value: 'test' } });

  const searchButton = getByText('Search');
  fireEvent.click(searchButton);

  expect(localStorage.getItem('searchValue')).toBe('test');
  fetchMock.resetMocks();
});
