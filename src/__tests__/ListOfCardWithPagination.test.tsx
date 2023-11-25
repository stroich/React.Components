import '@testing-library/jest-dom';
import { fireEvent, act, render } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import mockRouter from 'next-router-mock';
import React from 'react';
import { Provider } from 'react-redux';

import { arr } from '@/__mocks__/mockData.ts';
import {
  initialState,
  mockStoreWithoutFetch,
} from '@/__mocks__/mockStoreWithoutFetch.tsx';

import ListOfCardWithPagination from '../components/ListOfCardWithPagination/ListOfCardWithPagination.tsx';

jest.mock('next/router', () => require('next-router-mock'));

describe('SearchResultsSection', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.resetMocks();
  });
  test('Pagination is on the page', () => {
    const { getAllByRole } = render(
      <Provider store={mockStoreWithoutFetch(initialState)}>
        <ListOfCardWithPagination arrArtworks={arr} />
      </Provider>
    );
    act(() => {
      const buttonPagination = getAllByRole('button');
      expect(buttonPagination.length).toBe(7);
    });
  });

  test('the component updates URL query parameter when page changes', async () => {
    await mockRouter.push('/');
    const { getAllByRole } = render(
      <Provider store={mockStoreWithoutFetch(initialState)}>
        <ListOfCardWithPagination arrArtworks={arr} />
      </Provider>
    );
    const buttonPagination = getAllByRole('button');
    fireEvent.click(buttonPagination[2]);
    expect(mockRouter.asPath).toEqual('/?page=2');
  });
});
