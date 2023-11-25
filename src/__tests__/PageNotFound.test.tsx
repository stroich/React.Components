import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-13.5';

import PageNotFound from '../components/404/PageNotFound.tsx';

jest.mock('next/router', () => require('next-router-mock'));

test('404 page is displayed when navigating to an invalid route', async () => {
  await mockRouter.push('/non-existent-route');
  const { getByText } = render(
    <MemoryRouterProvider>
      <PageNotFound />
    </MemoryRouterProvider>
  );
  const pageTitle = getByText('404 - Page Not Found');
  expect(pageTitle).toBeInTheDocument();
});
