import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { DataContext } from '../app/Provider/DataProvider.tsx';
import SearchResultsSection from '../components/SearchResultsSection/SearchResultsSection.tsx';
import Details from '../components/details/Details.tsx';
import * as API from '../API/api.ts';
import { contextValue } from '../__mocks__/mockProvider.ts';

const mockedGetDetailsAboutTheCard = jest.spyOn(API, 'getDetailsAboutTheCard');

const mockData = {
  title: 'Winter: Cat on a Cushion',
  description: null,
  data: 1909,
  culture: 'Théophile-Alexandre Steinlen\nFrench, born Switzerland, 1859-1923',
};

describe('SearchResultsSection', () => {
  afterAll(() => {
    mockedGetDetailsAboutTheCard.mockRestore();
  });

  test('clicking on a card opens a detailed card component', async () => {
    mockedGetDetailsAboutTheCard.mockResolvedValue(mockData);

    const { container, findByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <DataContext.Provider value={contextValue}>
                <SearchResultsSection />
              </DataContext.Provider>
            }
          >
            <Route
              path="details"
              element={
                <DataContext.Provider value={contextValue}>
                  <Details />
                </DataContext.Provider>
              }
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const card = container.querySelector('.card') as Element;
    fireEvent.click(card);
    const details = await findByText('Year: 1909');
    expect(details).toBeInTheDocument();
  });
  test('clicking triggers an additional API call to fetch detailed information', async () => {
    mockedGetDetailsAboutTheCard.mockResolvedValue(mockData);

    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <DataContext.Provider value={contextValue}>
                <SearchResultsSection />
              </DataContext.Provider>
            }
          >
            <Route
              path="details"
              element={
                <DataContext.Provider value={contextValue}>
                  <Details />
                </DataContext.Provider>
              }
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const card = container.querySelector('.card') as Element;
    fireEvent.click(card);
    expect(mockedGetDetailsAboutTheCard).toHaveBeenCalled();
  });
});
