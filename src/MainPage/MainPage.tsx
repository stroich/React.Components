import { Component } from 'react';
import { getArrArtWork, CardData } from '../API/api.ts';
import Search from '../components/SearchSection/search.tsx';
import { ErrorBoundary } from '../components/Error/ErrorBoundary.tsx';
import ListOfCard from '../components/listOfCard/listOfCard.tsx';
import { ErrorButton } from '../components/ErrorButton/ErrorButton.tsx';
import './MainPage.css';

interface MainState {
  arrValue: Array<CardData>;
  isLoading: boolean;
}

class MainPage extends Component<object, MainState> {
  constructor(props: object) {
    super(props);
    this.state = {
      arrValue: [],
      isLoading: false,
    };
  }

  updateData = async () => {
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
    await this.updateData();
  }

  render() {
    return (
      <div className={'container'}>
        <Search setArrValue={this.updateData} />
        <ErrorBoundary>
          <main>
            {this.state.isLoading ? (
              <div className="loading">loading...</div>
            ) : (
              <ListOfCard artworks={this.state.arrValue} />
            )}
          </main>
          <ErrorButton />
        </ErrorBoundary>
      </div>
    );
  }
}

export default MainPage;
