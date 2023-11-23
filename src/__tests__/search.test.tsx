import { render, fireEvent } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import {
  initialState,
  mockStoreWithoutFetch,
} from '../__mocks__/mockStoreWithoutFetch.tsx';
import Search from '../components/SearchSection/search.tsx';

test('clicking the Search button saves the entered value to the local storage', () => {
  fetchMock.enableMocks();
  localStorage.clear();
  const { getByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <Provider store={mockStoreWithoutFetch(initialState)}>
        <Search setArrValue={jest.fn()} />
      </Provider>
    </MemoryRouter>
  );
  const inputElement = getByPlaceholderText('Enter a search query');
  fireEvent.change(inputElement, { target: { value: 'test' } });

  const searchButton = getByText('Search');
  fireEvent.click(searchButton);

  expect(localStorage.getItem('searchValue')).toBe('test');
  fetchMock.resetMocks();
});
