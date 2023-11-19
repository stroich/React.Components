import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import { mockArtworkData } from '../__mocks__/mockData.ts';
import { store } from '../app/store/store.ts';
import CardSelector from '../components/CardSelector/CardSelector.tsx';
import { renderWithRouterAndProvider } from '../utils/renderWithRouterAndProvider.tsx';

const dispatchSpy = jest.spyOn(store, 'dispatch');

describe('CardSelector', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.resetMocks();
  });
  test('CardSelector component renders correctly', () => {
    const { container } = renderWithRouterAndProvider(<CardSelector />);
    const optionElement = container.querySelectorAll('select option');
    expect(optionElement.length).toBe(4);
  });

  test('CardSelector changes the value of the number of cards when the option is selected', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockArtworkData));
    const { container } = renderWithRouterAndProvider(<CardSelector />);
    const selectElement = container.querySelector('select') as HTMLElement;
    fireEvent.change(selectElement, { target: { value: 12 } });
    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledTimes(2);
      expect(dispatchSpy).toHaveBeenLastCalledWith({
        type: 'numberOfCard/updateNumberOfCard',
        payload: 12,
      });
    });
  });
});
