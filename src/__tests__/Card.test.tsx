import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';

import { store } from '../app/store/store.ts';
import Card from '../components/Card/Card.tsx';

const artwork = {
  id: 51719,
  title: 'Winter: Cat on a Cushion',
  url: '',
};

const mockData = {
  data: {
    id: 87479,
    title: 'The Assumption of the Virgin',
    image_id: '47fd1564-93f5-f30b-7786-013421133b4a',
  },
};
describe('Card', () => {
  test('Card component renders the relevant card data', async () => {
    fetchMock.enableMocks();
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    await act(async () => {
      render(
        <Provider store={store}>
          <Card
            artwork={artwork}
            setIsOpenCard={jest.fn()}
            handleCardClick={jest.fn()}
          />
        </Provider>
      );
    });
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      'src',
      'https://www.artic.edu/iiif/2/47fd1564-93f5-f30b-7786-013421133b4a/full/200,/0/default.jpg'
    );
    const h3 = screen.getByRole('heading', { name: artwork.title });
    expect(h3).toBeInTheDocument();
  });
});
