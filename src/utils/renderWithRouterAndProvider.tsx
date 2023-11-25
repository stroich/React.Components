import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import { store } from '../app/store/store.ts';

export function renderWithRouterAndProvider(children: ReactNode) {
  return render(<Provider store={store()}>{children}</Provider>);
}
