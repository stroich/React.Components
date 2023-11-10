import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  DataProvider,
  DataContext,
  DataContextType,
} from '../app/Provider/DataProvider.tsx';

describe('DataProvider', () => {
  test(' DataProvider retrieves the value from the local storage upon mounting', async () => {
    localStorage.clear();
    localStorage.setItem('searchValue', 'test');
    let dataProviderContext: DataContextType | undefined;
    render(
      <DataProvider>
        <DataContext.Consumer>
          {(context) => {
            dataProviderContext = context;
            return null;
          }}
        </DataContext.Consumer>
      </DataProvider>
    );

    expect(dataProviderContext?.searchValue).toBe('test');
  });
});
