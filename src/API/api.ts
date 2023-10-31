interface Artwork {
  id: number;
  title: string;
}

interface IResponseArtwork {
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

async function fetchApi(
  apiUrl: string
): Promise<IResponseArtwork | IResponseImg> {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    console.error('An error has occurred:', error);
    throw error;
  }
}

export async function getArrArtWork(searchValue: string) {
  let apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchValue}&query[term][is_public_domain]=true&&page=2&limit=8`;
  const response = (await fetchApi(apiUrl)) as IResponseArtwork;
  const arrArtWork = returnIdAndTitle(response.data);

  return await Promise.all(
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
}
