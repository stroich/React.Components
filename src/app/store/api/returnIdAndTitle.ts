import { Artwork } from '../../../types/types.ts';

export function returnIdAndTitle(data: Array<Artwork>): Array<Artwork> {
  return data.map((item) => ({
    id: item.id,
    title: item.title,
  }));
}
