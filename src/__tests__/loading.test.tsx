import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import Loading from '../components/Loading/Loading.tsx';

test('Loading component renders correctly', () => {
  const { getByText } = render(<Loading classname={'classname'} />);
  const loading = getByText('loading...');
  expect(loading).toBeInTheDocument();
});
