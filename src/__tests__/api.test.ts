import fetchMock from 'jest-fetch-mock';

import { getDetailsAboutTheCard } from '../API/api.ts';

fetchMock.enableMocks();

describe('getDetailsAboutTheCard', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('fetches details about the card correctly', async () => {
    const mockApiResponse = {
      data: {
        id: '123',
        title: 'Artwork 1',
        description: 'Description',
        date_start: '2022-01-01',
        artist_display: 'Artist Name',
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse));

    const result = await getDetailsAboutTheCard('123');

    expect(result).toEqual({
      title: 'Artwork 1',
      description: 'Description',
      data: '2022-01-01',
      culture: 'Artist Name',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.artic.edu/api/v1/artworks/123'
    );
  });
});
