import { fireEvent, render } from '@testing-library/react';

import '@testing-library/jest-dom';
import CardSelector from '../components/CardSelector/CardSelector.tsx';
import { DataContext } from '../app/Provider/DataProvider.tsx';

const contextValue = {
  arrValue: [],
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

describe('CardSelector', () => {
  test('CardSelector component renders correctly', () => {
    const { container } = render(
      <DataContext.Provider value={contextValue}>
        <CardSelector />
      </DataContext.Provider>
    );
    const optionElement = container.querySelectorAll('select option');
    expect(optionElement.length).toBe(4);
  });
  test('CardSelector changes the value of the number of cards when the option is selected', () => {
    const { container } = render(
      <DataContext.Provider value={contextValue}>
        <CardSelector />
      </DataContext.Provider>
    );
    const selectElement = container.querySelector('select') as HTMLElement;
    fireEvent.change(selectElement, { target: { value: '4' } });
    expect(contextValue.setNumberOfCard).toHaveBeenCalledWith(4);
  });
});
