import React from 'react';
import { BiDetail } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BtnAddToCart from './BtnAddToCart';

export default class CardRender extends React.Component {
  render() {
    const { results } = this.props;
    const { title, price, category_id: categoryId, thumbnail, id } = results;
    const query = title.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '').replace(/ /g, '+');
    return (
      <div className="cartao has-background-warning-light card">
        <div className="card is-flex is-justify-content-center">
          <div className="card-image">
            <figure className="image is-128x128 mt-2">
              <img
                alt={ title }
                src={ thumbnail }
                data-testid="product"
                className="image is-128x128"
              />
            </figure>
          </div>
        </div>
        <p
          className="subtitle is-6
          m-3 has-text-black-bis has-text-centered has-text-weight-bold
          overflow"
        >
          { title }
        </p>
        <p
          className="has-text-danger-dark
          has-text-centered has-text-weight-bold "
        >
          { `R$: ${price}` }
        </p>
        <div className="card">
          <footer className="card-footer">
            <button type="button" className="card-footer-item button is-link m-2">
              <BiDetail size="1.5em" color="white" className="mr-3" />
              <Link
                className="has-text-white"
                to={ `/product/${categoryId}/${query}` }
                data-testid="product-detail-link"
                productId={ id }
              >
                Detalhes
              </Link>
            </button>
            <BtnAddToCart
              title={ title }
              thumbnail={ thumbnail }
              price={ price }
              id={ id }
              buttonId="product-add-to-cart"
              className="card-footer-item button is-success m-2"
            />
          </footer>
        </div>
      </div>
    );
  }
}

CardRender.propTypes = {
  results: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    category_id: PropTypes.string,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
