import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import mockRouter from 'next-router-mock';
import { Provider } from 'react-redux';

import { arr } from '@/__mocks__/mockData.ts';

import {
  initialState,
  mockStoreWithoutFetch,
} from '../__mocks__/mockStoreWithoutFetch.tsx';
import SearchResultsSection from '../components/SearchResultsSection/SearchResultsSection.tsx';

jest.mock('next/router', () => require('next-router-mock'));

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
        <Provider store={mockStoreWithoutFetch(initialState)}>
          <SearchResultsSection arrArtworks={arr} />
        </Provider>
      );
    });
    const card = screen.getByText('Winter: Cat on a Cushion');
    expect(card).toBeInTheDocument();
  });
  test('there is no detail on the page', async () => {
    await mockRouter.push('/');
    const { queryByText } = render(
      <Provider store={mockStoreWithoutFetch(initialState)}>
        <SearchResultsSection arrArtworks={arr} />
      </Provider>
    );
    const detailsTitle = queryByText(
      'Buddha Shakyamuni Seated in Meditation (Dhyanamudra)'
    );
    expect(detailsTitle).toBeNull();
  });
});
