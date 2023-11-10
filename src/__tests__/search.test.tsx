import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Search from '../components/SearchSection/search.tsx';
import { DataProvider } from '../app/Provider/DataProvider.tsx';

test('clicking the Search button saves the entered value to the local storage', () => {
  localStorage.clear();
  const { getByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <DataProvider>
        <Search setArrValue={jest.fn()} />
      </DataProvider>
    </MemoryRouter>
  );
  const inputElement = getByPlaceholderText('Enter a search query');
  fireEvent.change(inputElement, { target: { value: 'test' } });

  const searchButton = getByText('Search');
  fireEvent.click(searchButton);

  expect(localStorage.getItem('searchValue')).toBe('test');
});
