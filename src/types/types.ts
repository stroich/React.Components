export interface Artwork {
  id: number;
  title: string;
  url: string;
}

export interface IResponseArtwork {
  pagination: { total_pages: number; total: number; limit: number };
  data: Array<Artwork>;
}

export interface IResponseDetails {
  data: {
    title: string;
    description: string;
    date_start: string;
    artist_display: string;
  };
}

export interface IResponseImg {
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
