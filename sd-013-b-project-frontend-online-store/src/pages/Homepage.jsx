import React from 'react';
import '../Homepage.css';
import CardLibrary from '../components/CardLibrary';
import Header from '../components/Header';

export default class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <CardLibrary />
      </div>
    );
  }
}
