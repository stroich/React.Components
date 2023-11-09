import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { DataContext } from '../app/Provider/DataProvider.tsx';
import ListOfCard from '../components/listOfCard/listOfCard.tsx';

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
  {
    id: 9372,
    title: 'The Large Cat',
    url: 'https://www.artic.edu/iiif/2/86706756-2cf8-6a7c-58cc-90efaa4db124/full/200,/0/default.jpg',
  },
  {
    id: 51724,
    title: 'Summer: Cat on a Balustrade',
    url: 'https://www.artic.edu/iiif/2/c7a1688c-8a21-8eab-086d-3537b1506705/full/200,/0/default.jpg',
  },
  {
    id: 5522,
    title: 'Cat Coffin',
    url: 'https://www.artic.edu/iiif/2/07b26469-589f-e3e0-dd58-be1d4daad30d/full/200,/0/default.jpg',
  },
  {
    id: 70989,
    title: 'Lion',
    url: 'https://www.artic.edu/iiif/2/4e2df5e5-10ff-9b80-db1c-419895f1054f/full/200,/0/default.jpg',
  },
];

const contextValue = {
  arrValue: arr,
  isLoading: false,
  totalPages: 10,
  page: 1,
  numberOfCard: 8,
  searchValue: ' ',
  updateData: jest.fn(),
  setPage: jest.fn(),
  setNumberOfCard: jest.fn(),
  setSearchValue: jest.fn(),
};

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
    expect(listOfCards?.children.length).toBe(8);
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
