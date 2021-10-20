import React from 'react';
import CardList from './CardList';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import * as api from '../services/api';

export default class CardLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.captureValueSelect = this.captureValueSelect.bind(this);

    this.state = {
      searchText: undefined,
      selectedCategory: undefined,
      results: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem('cart', '') === null) {
      localStorage.setItem('cart', '');
    }
    if (localStorage.getItem('evaluations', '') === null) {
      localStorage.setItem('evaluations', '');
    }
  }

  handleClick({ target }) {
    const { searchText, selectedCategory } = this.state;
    this.setState({ searchText: target.value }, () => {
      this.fetchData(searchText, selectedCategory);
    });
  }

  captureValueSelect({ target }) {
    const { searchText, selectedCategory } = this.state;
    this.setState({ selectedCategory: target.id });
    this.setState({ searchText: target.value }, () => {
      this.fetchData(searchText, selectedCategory);
    });
  }

  async fetchData() {
    const { searchText, selectedCategory } = this.state;
    const data = await api.getProductsFromCategoryAndQuery(selectedCategory, searchText);
    this.setState({
      results: data.results,
    });
  }

  render() {
    const { results } = this.state;
    return (
      <div className="columns">
        <div className="column size-fixed mt-5">
          <Sidebar captureValueSelect={ this.captureValueSelect } />
        </div>
        <div className="column mt-5">
          <SearchBar getSearch={ this.handleClick } />
          <CardList results={ results } />
        </div>
      </div>
    );
  }
}
