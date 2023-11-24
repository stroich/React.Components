import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import mockRouter from 'next-router-mock';

import CardSelector from '../components/CardSelector/CardSelector.tsx';
import { renderWithRouterAndProvider } from '../utils/renderWithRouterAndProvider.tsx';

jest.mock('next/router', () => require('next-router-mock'));
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
    await mockRouter.push('/');
    const { container } = renderWithRouterAndProvider(<CardSelector />);
    const selectElement = container.querySelector('select') as HTMLElement;
    fireEvent.change(selectElement, { target: { value: 12 } });
    await waitFor(() => {
      expect(mockRouter.asPath).toEqual('/?limit=12');
    });
  });
});
