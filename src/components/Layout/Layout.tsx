import { Outlet } from 'react-router-dom';

import { DataProvider } from '../../app/Provider/DataProvider.tsx';
import { ErrorBoundary } from '../Error/ErrorBoundary.tsx';

const Layout = () => {
  return (
    <ErrorBoundary>
      <DataProvider>
        <Outlet />
      </DataProvider>
    </ErrorBoundary>
  );
};

export default Layout;
