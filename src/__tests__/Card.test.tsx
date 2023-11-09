import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import Card from '../components/Card/Card.tsx';

const artwork = {
  id: 51719,
  title: 'Winter: Cat on a Cushion',
  url: 'https://www.artic.edu/iiif/2/e8e67721-bbb1-d007-82bd-c430ea73db70/full/200,/0/default.jpg',
};
describe('Card', () => {
  test('Card component renders the relevant card data', () => {
    const { container } = render(
      <Card
        artwork={artwork}
        setIsOpenCard={jest.fn()}
        handleCardClick={jest.fn()}
      />
    );
    const imgElement = container.querySelector('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', artwork.url);
    const h3 = container.querySelector('h3');
    expect(h3).toBeInTheDocument();
    expect(h3).toHaveTextContent(artwork.title);
  });
});
