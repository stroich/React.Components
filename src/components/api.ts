interface Artwork {
  id: number;
  title: string;
}

export interface IArtwork {
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
    if (!response.ok) {
      console.log(
        `Error executing fetch fetchApi: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

export async function getArrArtWork(searchValue: string) {
  let apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchValue}&query[term][is_public_domain]=true&&page=1&limit=6`;
  const response = await fetchApi(apiUrl);
  const arrArtWork = returnIdAndTitle(response.data);

  return await Promise.all(
    arrArtWork.map(async (el) => {
      apiUrl = `https://api.artic.edu/api/v1/artworks/${el.id}?fields=id,title,image_id`;
      const result = await fetchApi(apiUrl);
      return {
        id: el.id,
        title: el.title,
        url: `https://www.artic.edu/iiif/2/${result.data.image_id}/full/200,/0/default.jpg`,
      };
    })
  );
}
