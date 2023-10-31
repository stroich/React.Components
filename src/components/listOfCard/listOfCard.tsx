import { CardData } from '../../API/api.ts';
import { Component } from 'react';
import './listOfCard.css';

interface ListOfCardProps {
  artworks: Array<CardData>;
}

class ListOfCard extends Component<ListOfCardProps> {
  render() {
    const { artworks } = this.props;

    return (
      <div className={'cards'}>
        {artworks.map((artwork: CardData) => (
          <div className={'card'} key={artwork.id}>
            <img src={artwork.url} alt={artwork.title} />
            <h3 className={'card-title'}>{artwork.title}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default ListOfCard;
