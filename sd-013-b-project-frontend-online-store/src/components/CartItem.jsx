import React from 'react';
import PropTypes from 'prop-types';

export default class CartItem extends React.Component {
  render() {
    const { onClick, title, thumbnail, quantity, price, id } = this.props;

    return (
      <li className="is-flex p-3 m-6 is-align-items-center">
        <img src={ thumbnail } alt={ title } />
        <p data-testid="shopping-cart-product-name">
          {title}
        </p>
        <p className="ml-5 mr-5">{ `Preco: R$: ${Math.round(price * quantity)}` }</p>
        <button
          type="submit"
          data-testid="product-decrease-quantity"
          id={ `${id}-product-decrease-quantity` }
          onClick={ onClick }
        >
          -
        </button>
        <span data-testid="shopping-cart-product-quantity">{quantity}</span>
        <button
          type="submit"
          data-testid="product-increase-quantity"
          id={ `${id}-product-increase-quantity` }
          onClick={ onClick }
        >
          +
        </button>
        <button
          type="submit"
          id={ `${id}-remove` }
          onClick={ onClick }
        >
          Retirar
        </button>
      </li>
    );
  }
}

CartItem.propTypes = {
  quantity: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
