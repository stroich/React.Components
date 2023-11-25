import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import mockRouter from 'next-router-mock';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import {
  initialState,
  mockStoreWithoutFetch,
} from '@/__mocks__/mockStoreWithoutFetch.tsx';

import { mockDetailsData } from '../__mocks__/mockData.ts';
import Details from '../components/details/Details.tsx';

jest.mock('next/router', () => require('next-router-mock'));

describe('Details', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.resetMocks();
  });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    await act(async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockDetailsData));
      render(
        <Provider store={mockStoreWithoutFetch(initialState)}>
          <Details />
        </Provider>
      );
    });

    expect(
      screen.getByText('Buddha Shakyamuni Seated in Meditation (Dhyanamudra)')
    ).toBeInTheDocument();
    expect(screen.getByText('Year: 1101')).toBeInTheDocument();
    expect(screen.getByText('Culture: India')).toBeInTheDocument();
  });

  test('Ensure that clicking the close button hides the component', async () => {
    await mockRouter.push('/details?details=21023');
    const { findByAltText } = render(
      <Provider store={mockStoreWithoutFetch(initialState)}>
        <Details />
      </Provider>
    );

    const close = await findByAltText('close');
    fireEvent.click(close);
    await waitFor(() => {
      expect(mockRouter.asPath).toEqual('/');
    });
  });
});
