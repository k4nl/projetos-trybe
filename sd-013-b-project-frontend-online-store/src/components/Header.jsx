import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className="shopping-header">
        <img className="logo-image" src="https://i.pinimg.com/originals/c1/92/9d/c1929d3492c2f64ab65b43808c072043.jpg" alt="logo" />
        <h1 className="page-title">Shopping Online</h1>
      </header>
    );
  }
}
