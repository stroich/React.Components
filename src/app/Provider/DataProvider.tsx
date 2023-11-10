import { createContext, FC, ReactNode, useState } from 'react';

import { CardData } from '../../API/api.ts';

export type DataContextType = {
  arrValue: Array<CardData> | [];
  isLoading: boolean;
  totalPages: number;
  page: number;
  numberOfCard: number;
  searchValue: string;
  updateData: (newData: {
    [key: string]: string | number | boolean | Array<CardData> | [] | undefined;
  }) => void;
};

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

type DataContextProps = {
  children: ReactNode;
};

export const DataProvider: FC<DataContextProps> = ({ children }) => {
  let searchValue = localStorage.getItem('searchValue');
  searchValue = searchValue || ' ';
  const [context, setContext] = useState({
    arrValue: [],
    isLoading: true,
    numberOfCard: 8,
    page: 1,
    totalPages: 0,
    searchValue: searchValue,
  });

  const updateData = (newData: Partial<typeof DataContext>) => {
    setContext((prevState) => {
      return {
        ...prevState,
        ...newData,
      };
    });
  };

  return (
    <DataContext.Provider
      value={{
        ...context,
        updateData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
