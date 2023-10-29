import { Component } from 'react';
import Search from './components/header/search.tsx';
import ListOfCard from './components/listOfCard/listOfCard.tsx';
import { getArrArtWork, IArtwork } from './components/api.ts';
import { ErrorBoundary } from './components/Error/ErrorBoundary.tsx';
import { ErrorButton } from './components/ErrorButton/ErrorButton.tsx';

interface AppState {
  arrValue: Array<IArtwork>;
  isLoading: boolean;
}

class App extends Component<NonNullable<unknown>, AppState> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = {
      arrValue: [],
      isLoading: false,
    };
  }

  setArrValue = async () => {
    this.setState(() => ({
      isLoading: true,
    }));
    const searchValue = localStorage.getItem('searchValue');
    const queryValue = searchValue || ' ';
    const arrValue = await getArrArtWork(queryValue);
    this.setState({
      arrValue: arrValue,
      isLoading: false,
    });
  };

  async componentDidMount() {
    await this.setArrValue();
  }

  render() {
    return (
      <div className={'container'}>
        <Search setArrValue={this.setArrValue} />
        <ErrorBoundary>
          <main>
            {!this.state.isLoading && (
              <ListOfCard artworks={this.state.arrValue} />
            )}
            {this.state.isLoading && <div className="loading">loading...</div>}
          </main>
          <ErrorButton />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
