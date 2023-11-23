import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/app/store/store.ts';

import { ErrorBoundary } from '../Error/ErrorBoundary.tsx';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>{children}</Provider>
    </ErrorBoundary>
  );
};

export default Layout;
