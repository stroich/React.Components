import { render } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../app/store/store.ts';

export const mockStore = store;

export const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={mockStore}>{children}</Provider>;
};

function renderWithRouterAndProvider(children: ReactNode) {
  return render(<MemoryRouter>{Wrapper({ children })}</MemoryRouter>);
}

export default renderWithRouterAndProvider;
