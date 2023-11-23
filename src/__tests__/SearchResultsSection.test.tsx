import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  initialState,
  mockStoreWithoutFetch,
} from '../__mocks__/mockStoreWithoutFetch.tsx';
import { store } from '../app/store/store.ts';
import SearchResultsSection from '../components/SearchResultsSection/SearchResultsSection.tsx';
import Details from '../components/details/Details.tsx';

describe('SearchResultsSection', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.resetMocks();
  });
  test('there is no detail on the page', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <Provider store={mockStoreWithoutFetch(initialState)}>
                  <SearchResultsSection />
                </Provider>
              }
            />
          </Routes>
        </MemoryRouter>
      );
    });
    const card = screen.getByText('Winter: Cat on a Cushion');
    expect(card).toBeInTheDocument();
  });
  test('there is no detail on the page at zero', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <Provider store={store}>
                <SearchResultsSection />
              </Provider>
            }
          >
            <Route
              path="details"
              element={
                <Provider store={store}>
                  <Details />
                </Provider>
              }
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const card = container.querySelector('.card') as Element;
    expect(card).toBeNull();
  });
});
