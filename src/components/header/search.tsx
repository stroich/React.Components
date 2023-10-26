import { ChangeEvent, Component } from 'react';
import './search.css';

interface SearchState {
  searchValue: string;
}
class Search extends Component<NonNullable<unknown>, SearchState> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  componentDidMount() {
    const searchValue = localStorage.getItem('searchValue');
    if (searchValue) {
      this.setState({ searchValue: searchValue });
    }
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    this.setState({ searchValue: searchValue });
  };

  clickButton = () => {
    const { searchValue } = this.state;
    localStorage.setItem('searchValue', searchValue);
  };

  render() {
    return (
      <header>
        <div className={'search'}>
          <input
            className="search-input"
            type="text"
            value={this.state.searchValue}
            onChange={this.handleInputChange}
            placeholder="Enter a search query"
          />
          <button className="search-button" onClick={this.clickButton}>
            Search
          </button>
        </div>
      </header>
    );
  }
}

export default Search;
