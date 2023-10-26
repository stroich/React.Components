import React from 'react';
import { IArtwork } from '../api.ts';
import './listOfCard.css';

interface ListOfCardProps {
  artworks: Array<IArtwork>;
}

class ListOfCard extends React.Component<ListOfCardProps> {
  render() {
    const { artworks } = this.props;

    return (
      <div className={'cards'}>
        {artworks.map((artwork: IArtwork) => (
          <div className={'card'} key={artwork.id}>
            <img src={artwork.url} alt={artwork.title} />
            <h3>{artwork.title}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default ListOfCard;
