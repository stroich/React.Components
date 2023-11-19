import { processArtworkQueryData } from './transformResponse.ts';
import { api } from '../app/store/api/artwork.api.ts';

export function useCustomArtworkQuery(
  searchValue: string,
  page: number,
  limit: number
) {
  const { data, error, isFetching } = api.useGetArtworksQuery({
    searchValue,
    page,
    limit,
  });

  let processedData;
  if (data) {
    processedData = processArtworkQueryData(data, limit);
  }

  return {
    data: processedData,
    isFetching,
    error,
  };
}
