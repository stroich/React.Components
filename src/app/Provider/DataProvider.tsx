import { createContext, FC, ReactNode, useState } from 'react';

import { CardData, getArrArtWork } from '../../API/api.ts';

export type DataContextType = {
  arrValue: Array<CardData>;
  isLoading: boolean;
  totalPages: number;
  page: number;
  numberOfCard: number;
  searchValue: string;
  updateData: (currentPage?: number) => void;
  setPage: (n: number) => void;
  setNumberOfCard: (n: number) => void;
  setSearchValue: (s: string) => void;
};

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

type DataContextProps = {
  children: ReactNode;
};

export const DataProvider: FC<DataContextProps> = ({ children }) => {
  const [arrValue, setArrValue] = useState<Array<CardData>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfCard, setNumberOfCard] = useState(8);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  let search = localStorage.getItem('searchValue');
  search = search || ' ';
  const [searchValue, setSearchValue] = useState(search);

  const updateData = async (currentPage = page) => {
    setIsLoading(true);
    const queryValue = searchValue || ' ';
    const result = await getArrArtWork(queryValue, currentPage, numberOfCard);
    setArrValue(result.arrArtWork);
    setTotalPages(result.totalPages);
    setIsLoading(false);
  };

  return (
    <DataContext.Provider
      value={{
        arrValue,
        isLoading,
        numberOfCard,
        page,
        totalPages,
        updateData,
        setPage,
        setNumberOfCard,
        setSearchValue,
        searchValue,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
