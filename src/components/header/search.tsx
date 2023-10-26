import { ChangeEvent, Component } from 'react';
import './search.css';

interface SearchProps {
  setArrValue: () => void;
}
interface SearchState {
  searchValue: string;
}
class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
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
    this.props.setArrValue();
  };

  render() {
    return (
      <header>
        <h1>Works of art from the Art Institute of Chicago</h1>
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
