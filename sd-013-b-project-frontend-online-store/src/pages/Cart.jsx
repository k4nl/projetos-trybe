import React from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import CartRender from '../components/CartRender';
import Header from '../components/Header';
import '../Homepage.css';

export default class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      sum: 0,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setItems = this.setItems.bind(this);
    this.sum = this.sum.bind(this);
  }

  componentDidMount() {
    this.setItems();
  }

  onClick({ target }) {
    const targetId = target.id;
    const increase = target.id.includes('increase');
    const decrease = target.id.includes('decrease');
    if (decrease === true) {
      this.decrement(targetId);
    } else if (increase === true) {
      this.increment(targetId);
    } else {
      this.remove(targetId);
    }
  }

  setItems() {
    const data = localStorage.getItem('cart');
    if (data) {
      const parsedData = JSON.parse(data);
      const sum = this.sum();
      this.setState({
        items: parsedData,
        sum,
      });
    }
  }

  remove(targetId) {
    const data = localStorage.getItem('cart');
    const parsedData = JSON.parse(data);
    const foundItem = parsedData
      .filter((item) => `${item.id}-remove` !== targetId);
    localStorage.setItem('cart', JSON.stringify([...foundItem]));
    this.setItems();
    this.sum();
  }

  increment(targetId) {
    const data = localStorage.getItem('cart');
    const parsedData = JSON.parse(data);
    const foundItem = parsedData
      .find((item) => `${item.id}-product-increase-quantity` === targetId);
    foundItem.quantity += 1;
    localStorage.setItem('cart', JSON.stringify([...parsedData]));
    this.setItems();
    this.sum();
  }

  decrement(targetId) {
    const data = localStorage.getItem('cart');
    const parsedData = JSON.parse(data);
    const foundItem = parsedData
      .find((item) => `${item.id}-product-decrease-quantity` === targetId);
    if (foundItem.quantity > 0) {
      foundItem.quantity -= 1;
    }
    localStorage.setItem('cart', JSON.stringify([...parsedData]));
    this.setItems();
    this.sum();
  }

  sum() {
    const data = localStorage.getItem('cart');
    const parsedData = JSON.parse(data);
    const foundItem = parsedData.map((item) => item.price * item.quantity);
    if (foundItem.length !== 0) {
      const sum = foundItem.reduce((a, b) => a + b);
      return sum;
    }
    this.setState({ items: [], sum: 0 });
  }

  render() {
    const { items, sum } = this.state;

    if (items.length === 0) {
      return (
        <div>
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          <Link to="/">Voltar</Link>
        </div>
      );
    }

    return (
      <section>
        <Header />
        <div
          className="navbar
          has-background-danger-light
          is-flex
          is-justify-content-space-between"
        >
          <Link to="/" className="has-text-white">
            <button
              type="button"
              className="button is-link mt-3 mb-2 ml-6 is-flex is-small is-rounded"
            >
              <BsArrowReturnLeft size="1.5em" className="mr-2 mt-1" />
              Voltar
            </button>
          </Link>
        </div>
        <div className="header-background p-1">
          <p
            className="title is-4 has-text-white has-text-centered "
          >
            Carrinho de compras
          </p>
        </div>
        <CartRender
          onClick={ this.onClick }
          items={ items }
          sum={ sum }
          label="Finalizar compra"
        />
      </section>
    );
  }
}
