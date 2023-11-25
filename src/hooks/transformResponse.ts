import { returnIdAndTitle } from './returnIdAndTitle.ts';
import { IResponseArtwork } from '../types/types.ts';

export function processArtworkQueryData(data: IResponseArtwork, limit: number) {
  let totalPages = data.pagination.total;
  if (totalPages > 800) {
    totalPages = Math.floor(800 / limit);
  } else {
    totalPages = data.pagination.total_pages;
  }
  const arrArtWork = returnIdAndTitle(data.data);

  return {
    totalPages: totalPages,
    arrArtWork: arrArtWork,
  };
}
