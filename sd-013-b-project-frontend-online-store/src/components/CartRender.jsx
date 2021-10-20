import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartItem from './CartItem';

export default class CartRender extends React.Component {
  render() {
    const { items, onClick, sum, label, endPusharse, id } = this.props;

    return (
      <section>
        <ol className="ml-6">
          {items.map((item) => (<CartItem
            id={ item.id }
            title={ item.title }
            thumbnail={ item.thumbnail }
            quantity={ item.quantity }
            price={ item.price }
            key={ item.id }
            onClick={ onClick }
            buttonId="product-detail-add-to-cart"
          />))}
        </ol>
        <div className="total-price">
          <h2>
            <span>{ `Preço total da compra: R$${Math.round(sum)}` }</span>
          </h2>
          <Link to="/pusharse">
            <button
              type="submit"
              onClick={ endPusharse }
              data-testid={ id }
            >
              { label }
            </button>
          </Link>
        </div>
      </section>
    );
  }
}

CartRender.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  sum: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  endPusharse: PropTypes.string.isRequired,
};
