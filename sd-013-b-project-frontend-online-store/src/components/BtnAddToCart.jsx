import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default class BtnAddToCart extends React.Component {
  constructor() {
    super();

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    /* baseado na ideia do grupo 3 https://github.com/tryber/sd-013-b-project-frontend-online-store/blob/d5291bf6ee4efe61472a347f4980c1a96b7b3028/src/components/Product/index.js#L9
    */
    const { title, price, thumbnail, id } = this.props;

    const prevsItems = localStorage.getItem('cart');
    let items = [];

    if (prevsItems) {
      items = JSON.parse(prevsItems);
    }
    const haveItemAlready = items.find((item) => item.id === id);
    const fullItems = [...items, { title, price, thumbnail, id, quantity: 1 }];
    if (haveItemAlready) {
      haveItemAlready.quantity += 1;
      localStorage.setItem('cart', JSON.stringify([...items]));
    } else {
      localStorage.setItem('cart', JSON.stringify(fullItems));
    }
  }

  render() {
    const { buttonId, className } = this.props;
    return (
      <button
        className={ className }
        id="product-add-to-cart"
        data-testid={ buttonId }
        type="button"
        onClick={ this.addToCart }
      >
        <FaShoppingCart size="1.5em" color="white" className="mr-3" />
        Comprar
      </button>
    );
  }
}

BtnAddToCart.defaultProps = {
  id: undefined,
  title: undefined,
  thumbnail: undefined,
  price: undefined,
  buttonId: undefined,
  className: undefined,
};

BtnAddToCart.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  buttonId: PropTypes.string,
  className: PropTypes.string,
};
