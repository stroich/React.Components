import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { mockDetailsData } from '../__mocks__/mockData.ts';
import SearchResultsSection from '../components/SearchResultsSection/SearchResultsSection.tsx';
import Details from '../components/details/Details.tsx';
import renderWithRouterAndProvider, {
  mockStore,
} from '../utils/renderWithRouterAndProvider.tsx';

describe('Details', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.resetMocks();
  });

  test('Check that a loading indicator is displayed while fetching data', async () => {
    renderWithRouterAndProvider(<Details />);
    const loading = screen.getByText('loading...');
    await waitFor(() => {
      expect(loading).toBeInTheDocument();
    });
  });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    await act(async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockDetailsData));
      render(
        <MemoryRouter initialEntries={['/details?page=1&details=158']}>
          <Routes>
            <Route
              path="details"
              element={
                <Provider store={mockStore}>
                  <Details />
                </Provider>
              }
            />
            <Route
              path="/"
              element={
                <Provider store={mockStore}>
                  <SearchResultsSection />
                </Provider>
              }
            />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(
      screen.getByText('Buddha Shakyamuni Seated in Meditation (Dhyanamudra)')
    ).toBeInTheDocument();
    expect(screen.getByText('Year: 1101')).toBeInTheDocument();
    expect(screen.getByText('Culture: India')).toBeInTheDocument();
  });

  test('Ensure that clicking the close button hides the component', async () => {
    const { queryByText, findByAltText } = render(
      <MemoryRouter initialEntries={['/details?page=1&details=158']}>
        <Routes>
          <Route
            path="details"
            element={
              <Provider store={mockStore}>
                <Details />
              </Provider>
            }
          />
          <Route
            path="/"
            element={
              <Provider store={mockStore}>
                <SearchResultsSection />
              </Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const close = await findByAltText('close');
    fireEvent.click(close);
    expect(queryByText('Winter: Cat on a Cushion')).toBeNull();
  });
});
