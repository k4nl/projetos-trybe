import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import CartRender from '../components/CartRender';
import PusharseForm from '../components/PusharseForm';
import '../Homepage.css';
import Header from '../components/Header';

export default class Pusharse extends React.Component {
  constructor() {
    super();

    this.setItems = this.setItems.bind(this);

    this.state = {
      items: [],
      sum: 0,
    };
  }

  componentDidMount() {
    this.setItems();
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

  endPusharse() {
    console.log('clicou');
    console.log('clicou');
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
    return (
      <section>
        <Header />
        <Link to="/">Voltar</Link>
        <h2>Revise seus produtos: </h2>
        <CartRender
          items={ items }
          sum={ sum }
          label="Comprar"
          endPusharse={ this.endPusharse }
        />
        <h2>Informacoes do comprador: </h2>
        <PusharseForm />
        <h2>Metodo de pagamento: </h2>
      </section>
    );
  }
}
