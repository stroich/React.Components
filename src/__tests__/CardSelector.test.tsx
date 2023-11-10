import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { DataContext } from '../app/Provider/DataProvider.tsx';
import CardSelector from '../components/CardSelector/CardSelector.tsx';

const contextValue = {
  arrValue: [],
  isLoading: false,
  totalPages: 10,
  page: 1,
  numberOfCard: 8,
  searchValue: ' ',
  updateData: jest.fn(),
};

describe('CardSelector', () => {
  test('CardSelector component renders correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <DataContext.Provider value={contextValue}>
          <CardSelector />
        </DataContext.Provider>
      </MemoryRouter>
    );
    const optionElement = container.querySelectorAll('select option');
    expect(optionElement.length).toBe(4);
  });

  test('CardSelector changes the value of the number of cards when the option is selected', () => {
    const updateDataMock = jest.fn();
    const newContextValue = {
      ...contextValue,
      updateData: updateDataMock,
    };
    const { container } = render(
      <MemoryRouter>
        <DataContext.Provider value={newContextValue}>
          <CardSelector />
        </DataContext.Provider>
      </MemoryRouter>
    );
    const selectElement = container.querySelector('select') as HTMLElement;
    fireEvent.change(selectElement, { target: { value: '12' } });
    expect(updateDataMock).toHaveBeenCalledWith({
      page: 1,
      numberOfCard: 12,
    });
  });
});
