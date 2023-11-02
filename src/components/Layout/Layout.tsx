import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '../Error/ErrorBoundary.tsx';

const Layout = () => {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};

export default Layout;
