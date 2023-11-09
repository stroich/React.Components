import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import { DataContext } from '../app/Provider/DataProvider.tsx';
import Details from '../components/details/Details.tsx';
import * as API from '../API/api.ts';
import SearchResultsSection from '../components/SearchResultsSection/SearchResultsSection.tsx';

const mockedGetDetailsAboutTheCard = jest.spyOn(API, 'getDetailsAboutTheCard');

const contextValue = {
  arrValue: [],
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
  description: 'empty',
  data: 1909,
  culture: 'Théophile-Alexandre Steinlen',
};

describe('Details', () => {
  afterAll(() => {
    mockedGetDetailsAboutTheCard.mockRestore();
  });

  test('Check that a loading indicator is displayed while fetching data', () => {
    mockedGetDetailsAboutTheCard.mockResolvedValue(mockData);

    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <DataContext.Provider value={contextValue}>
          <Details />
        </DataContext.Provider>
      </MemoryRouter>
    );
    const loading = getByText('loading...');
    expect(loading).toBeInTheDocument();
    expect(mockedGetDetailsAboutTheCard).not.toHaveBeenCalled();
  });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    mockedGetDetailsAboutTheCard.mockResolvedValue(mockData);
    const detailsParam = '158';

    const { getByText } = render(
      <MemoryRouter initialEntries={['/details?page=1&details=158']}>
        <DataContext.Provider value={contextValue}>
          <Details />
        </DataContext.Provider>
      </MemoryRouter>
    );

    await act(async () => {
      expect(mockedGetDetailsAboutTheCard).toHaveBeenCalledWith(detailsParam);
    });

    expect(getByText('Winter: Cat on a Cushion')).toBeInTheDocument();
    expect(getByText('Year: 1909')).toBeInTheDocument();
    expect(
      getByText('Culture: Théophile-Alexandre Steinlen')
    ).toBeInTheDocument();
    expect(getByText('empty')).toBeInTheDocument();
  });

  test('Ensure that clicking the close button hides the component', async () => {
    mockedGetDetailsAboutTheCard.mockResolvedValue(mockData);
    const detailsParam = '158';
    const { queryByText, findByAltText } = render(
      <MemoryRouter initialEntries={['/details?page=1&details=158']}>
        <Routes>
          <Route
            path="details"
            element={
              <DataContext.Provider value={contextValue}>
                <Details />
              </DataContext.Provider>
            }
          />
          <Route
            path="/"
            element={
              <DataContext.Provider value={contextValue}>
                <SearchResultsSection />
              </DataContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    await act(async () => {
      expect(mockedGetDetailsAboutTheCard).toHaveBeenCalledWith(detailsParam);
    });
    const close = await findByAltText('close');
    fireEvent.click(close);
    expect(queryByText('Winter: Cat on a Cushion')).toBeNull();
  });
});
