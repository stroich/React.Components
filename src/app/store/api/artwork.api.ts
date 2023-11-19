import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IResponseArtwork,
  IResponseDetails,
  IResponseImg,
} from '../../../types/types.ts';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://api.artic.edu/api/v1/' });

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    getArtworks: builder.query<
      IResponseArtwork,
      { searchValue: string; page: number; limit: number }
    >({
      query: ({ searchValue, page, limit }) =>
        `artworks/search?q=${searchValue}&query[term][is_public_domain]=true&page=${page}&limit=${limit}`,
    }),
    getArtworkImage: builder.query<IResponseImg, number>({
      query: (id) => `artworks/${id}?fields=id,title,image_id`,
    }),
    getArtworkDetails: builder.query<IResponseDetails, number>({
      query: (id) => `artworks/${id}`,
    }),
  }),
});

export const {
  useGetArtworksQuery,
  useGetArtworkImageQuery,
  useGetArtworkDetailsQuery,
} = api;
