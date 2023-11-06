import { Outlet } from 'react-router-dom';

import { ErrorBoundary } from '../Error/ErrorBoundary.tsx';
import { DataProvider } from '../../app/Provider/DataProvider.tsx';

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
