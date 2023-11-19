import '@testing-library/jest-dom';
import { fireEvent, render, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import {
  initialState,
  mockStoreWithoutFetch,
} from '../__mocks__/mockStoreWithoutFetch.tsx';
import ListOfCardWithPagination from '../components/ListOfCardWithPagination/ListOfCardWithPagination.tsx';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('SearchResultsSection', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.resetMocks();
  });
  test('Pagination is on the page', () => {
    const outletRef = React.createRef<HTMLImageElement>();

    const { getAllByRole } = render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Provider store={mockStoreWithoutFetch(initialState)}>
          <ListOfCardWithPagination outletRef={outletRef} />
        </Provider>
      </MemoryRouter>
    );
    act(() => {
      const buttonPagination = getAllByRole('button');
      expect(buttonPagination.length).toBe(7);
    });
  });

  test('the component updates URL query parameter when page changes', async () => {
    const outletRef = React.createRef<HTMLImageElement>();
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Provider store={mockStoreWithoutFetch(initialState)}>
          <ListOfCardWithPagination outletRef={outletRef} />
        </Provider>
      </MemoryRouter>
    );
    const buttonPagination = getAllByRole('button');
    fireEvent.click(buttonPagination[2]);
    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });
});
