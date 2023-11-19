import '@testing-library/jest-dom';
import { waitFor, screen, render } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import {
  initialState,
  mockStoreWithoutFetch,
} from '../__mocks__/mockStoreWithoutFetch.tsx';
import ListOfCard from '../components/listOfCard/listOfCard.tsx';
import renderWithRouterAndProvider from '../utils/renderWithRouterAndProvider.tsx';

const setNumberOfCard = jest.fn();
const outletRef = React.createRef<HTMLImageElement>();
describe('ListOfCard', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.resetMocks();
  });
  test('ListOfCard component displays the specified number of cards', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Provider store={mockStoreWithoutFetch(initialState)}>
          <ListOfCard handleCardClick={setNumberOfCard} outletRef={outletRef} />
        </Provider>
      </MemoryRouter>
    );

    const listOfCards = container.querySelector('.cards');
    expect(listOfCards?.children.length).toBe(4);
  });

  test('An appropriate message is displayed if no cards are present', async () => {
    await waitFor(() => {
      renderWithRouterAndProvider(
        <ListOfCard handleCardClick={setNumberOfCard} outletRef={outletRef} />
      );
    });
    const div = screen.getByText('Nothing found');
    await waitFor(() => {
      expect(div).toBeInTheDocument();
    });
  });
});
