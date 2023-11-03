interface Artwork {
  id: number;
  title: string;
}

interface IResponseArtwork {
  pagination: { total_pages: number };
  data: Array<Artwork>;
}

interface IResponseImg {
  data: {
    id: number;
    title: string;
    image_id: string;
  };
}

export interface CardData {
  id: number;
  title: string;
  url: string;
}

function returnIdAndTitle(data: Array<Artwork>): Array<Artwork> {
  return data.map((item) => ({
    id: item.id,
    title: item.title,
  }));
}

async function fetchApi(apiUrl: string) {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    console.error('An error has occurred:', error);
    throw error;
  }
}

export async function getArrArtWork(
  searchValue: string,
  page: number,
  limit: number
) {
  let apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchValue}&query[term][is_public_domain]=true&page=${page}&limit=${limit}`;
  const response = (await fetchApi(apiUrl)) as IResponseArtwork;
  let totalPages = response.pagination.total_pages;
  if (totalPages > 100) {
    totalPages = 100;
  }
  const arrArtWork = returnIdAndTitle(response.data);
  const newArrArtWork = await Promise.all(
    arrArtWork.map(async (el) => {
      apiUrl = `https://api.artic.edu/api/v1/artworks/${el.id}?fields=id,title,image_id`;
      const result = (await fetchApi(apiUrl)) as IResponseImg;
      return {
        id: el.id,
        title: el.title,
        url: `https://www.artic.edu/iiif/2/${result.data.image_id}/full/200,/0/default.jpg`,
      };
    })
  );
  return {
    totalPages: totalPages,
    arrArtWork: newArrArtWork,
  };
}

export async function getDetails(cardId: string) {
  const apiUrl = `https://api.artic.edu/api/v1/artworks/${cardId}`;
  const response = await fetchApi(apiUrl);
  return {
    title: response.data.title,
    description: response.data.description,
    data: response.data.date_start,
    culture: response.data.artist_display,
  };
}
