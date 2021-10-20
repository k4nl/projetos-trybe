import React from 'react';

export default class DetailsLi extends React.Component {
  render() {
    const { detail } = this.props;
    const { name, value_name } = detail;
    return (
      <li className="lista-hover-red">
        { `${name} - ${value_name}` }
      </li>
    );
  }
}
