import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { contextValue } from '../__mocks__/mockProvider.ts';
import { DataContext } from '../app/Provider/DataProvider.tsx';
import ListOfCard from '../components/listOfCard/listOfCard.tsx';

const setNumberOfCard = jest.fn();
const outletRef = React.createRef<HTMLImageElement>();
describe('ListOfCard', () => {
  test('ListOfCard component displays the specified number of cards', () => {
    const { container } = render(
      <MemoryRouter>
        <DataContext.Provider value={contextValue}>
          <ListOfCard handleCardClick={setNumberOfCard} outletRef={outletRef} />
        </DataContext.Provider>
      </MemoryRouter>
    );
    const listOfCards = container.querySelector('.cards');
    expect(listOfCards?.children.length).toBe(4);
  });

  test('An appropriate message is displayed if no cards are present', () => {
    const newContextValue = {
      ...contextValue,
      arrValue: [],
    };
    const { getByText } = render(
      <MemoryRouter>
        <DataContext.Provider value={newContextValue}>
          <ListOfCard handleCardClick={setNumberOfCard} outletRef={outletRef} />
        </DataContext.Provider>
      </MemoryRouter>
    );
    const div = getByText('Nothing found');
    expect(div).toBeInTheDocument();
  });
});
