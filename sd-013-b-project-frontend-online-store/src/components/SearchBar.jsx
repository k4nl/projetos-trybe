import React from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.captureValueText = this.captureValueText.bind(this);

    this.state = {
      searchText: undefined,
    };
  }

  captureValueText({ target }) {
    this.setState({ searchText: target.value });
  }

  render() {
    const { searchText } = this.state;
    const { getSearch } = this.props;

    return (
      <div className="is-flex is-justify-content-space-between mt-3 mr-5 border">
        <div>
          <div>
            <p data-testid="home-initial-message" className="title is-5">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          </div>
          <div className="is-flex is-align-itens-center">
            <input
              className="input is-info is-rounded mt-3 mb-3 is-small"
              type="text"
              onChange={ this.captureValueText }
              data-testid="query-input"
              placeholder="Digite algo"
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ getSearch }
              value={ searchText }
              className="button is-danger is-outlined is-rounded is-small mt-3 mb-3 ml-2"
            >
              <FaSearch size="1.5em" className="mr-1" />
              Pesquisar
            </button>
          </div>
        </div>
        <div className="">
          <Link data-testid="shopping-cart-button" to="/cart">
            <button type="button" className="button is-primary is-light mr-5 mt-5">
              Carrinho
              <FaShoppingCart size="1.5em" color="blue" />
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = { getSearch: PropTypes.func.isRequired };
