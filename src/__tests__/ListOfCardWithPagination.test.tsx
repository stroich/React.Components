import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

import { DataContext } from '../app/Provider/DataProvider.tsx';
import ListOfCardWithPagination from '../components/ListOfCardWithPagination/ListOfCardWithPagination.tsx';
import { contextValue } from '../__mocks__/mockProvider.ts';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('SearchResultsSection', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('Pagination is on the page', async () => {
    const outletRef = React.createRef<HTMLImageElement>();

    const { getAllByRole } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <DataContext.Provider value={contextValue}>
                <ListOfCardWithPagination outletRef={outletRef} />
              </DataContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const buttonPagination = getAllByRole('button');
    expect(buttonPagination.length).toBe(7);
  });

  test('the component updates URL query parameter when page changes', async () => {
    const outletRef = React.createRef<HTMLImageElement>();
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <DataContext.Provider value={contextValue}>
          <ListOfCardWithPagination outletRef={outletRef} />
        </DataContext.Provider>
      </MemoryRouter>
    );
    const buttonPagination = getAllByRole('button');
    fireEvent.click(buttonPagination[2]);
    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });
});
