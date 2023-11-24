import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/app/store/store.ts';
import { ErrorBoundary } from '@/components/Error/ErrorBoundary.tsx';

type LayoutProps = {
  children: ReactNode;
};

const newStore = store();

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Provider store={newStore}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Provider>
  );
};

export default Layout;
