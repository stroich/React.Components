import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { DataContext } from '../app/Provider/DataProvider.tsx';
import SearchResultsSection from '../components/SearchResultsSection/SearchResultsSection.tsx';
import Details from '../components/details/Details.tsx';
import * as API from '../API/api.ts';

const mockedGetDetailsAboutTheCard = jest.spyOn(API, 'getDetailsAboutTheCard');

const arr = [
  {
    id: 51719,
    title: 'Winter: Cat on a Cushion',
    url: 'https://www.artic.edu/iiif/2/e8e67721-bbb1-d007-82bd-c430ea73db70/full/200,/0/default.jpg',
  },
  {
    id: 158921,
    title: 'Courtesan Playing with a Cat',
    url: 'https://www.artic.edu/iiif/2/e1c9e502-1632-828f-f893-b166b6cc17d9/full/200,/0/default.jpg',
  },
  {
    id: 119335,
    title: 'Baroque Pearl Mounted as a Cat Holding a Mouse',
    url: 'https://www.artic.edu/iiif/2/fe394433-14ae-89e0-136f-31cbdb390771/full/200,/0/default.jpg',
  },
  {
    id: 68825,
    title: "The Cats' Rendezvous",
    url: 'https://www.artic.edu/iiif/2/752c8b28-5873-2ddb-f7cd-6ea9e4766195/full/200,/0/default.jpg',
  },
];

const contextValue = {
  arrValue: arr,
  isLoading: false,
  totalPages: 10,
  page: 1,
  numberOfCard: 4,
  searchValue: ' ',
  updateData: jest.fn(),
  setPage: jest.fn(),
  setNumberOfCard: jest.fn(),
  setSearchValue: jest.fn(),
};

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
