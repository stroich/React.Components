import { render } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../app/store/store.ts';

const wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export function renderWithRouterAndProvider(children: ReactNode) {
  return render(<MemoryRouter>{wrapper({ children })}</MemoryRouter>);
}
