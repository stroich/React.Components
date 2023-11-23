import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import PageNotFound from '../components/404/PageNotFound.tsx';
import Loading from '../components/Loading/Loading.tsx';

test('404 page is displayed when navigating to an invalid route', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/non-existent-route']}>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path={'/'} element={<Loading classname={'classname'} />} />
      </Routes>
    </MemoryRouter>
  );
  const pageTitle = getByText('404 - Page Not Found');
  expect(pageTitle).toBeInTheDocument();
});
