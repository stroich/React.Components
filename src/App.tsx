import { Component } from 'react';
import Search from './components/header/search.tsx';
import ListOfCard from './components/main/listOfCard.tsx';
import { getArrArtWork, IArtwork } from './components/api.ts';

interface AppState {
  arrValue: Array<IArtwork>;
  isLoading: boolean;
}

class App extends Component<NonNullable<unknown>, AppState> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = {
      arrValue: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const searchValue = localStorage.getItem('searchValue');
    if (searchValue) {
      const arrValue = await getArrArtWork(searchValue);
      this.setState({ arrValue: arrValue, isLoading: false });
    }
  }

  setArrValue = async () => {
    this.setState(() => ({
      isLoading: true,
    }));
    const searchValue = localStorage.getItem('searchValue');
    if (searchValue) {
      const arrValue = await getArrArtWork(searchValue);
      this.setState({ arrValue: arrValue, isLoading: false });
    }
  };

  render() {
    return (
      <div className={'container'}>
        <Search setArrValue={this.setArrValue} />
        <main>
          {!this.state.isLoading && (
            <ListOfCard artworks={this.state.arrValue} />
          )}
          {this.state.isLoading && <div className="loading">loading...</div>}
        </main>
      </div>
    );
  }
}

export default App;
