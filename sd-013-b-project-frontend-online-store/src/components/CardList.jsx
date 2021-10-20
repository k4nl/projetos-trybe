import React from 'react';
import PropTypes from 'prop-types';
import CardRender from './CardRender';

export default class CardList extends React.Component {
  render() {
    const { results } = this.props;

    if (results.length === 0) {
      return (
        <div className="mt-5 is-flex is-justify-content-center">
          <p className="mt-5 title is-3">Nenhum produto foi encontrado</p>
        </div>
      );
    }

    return (
      <div className="">
        <div className="is-flex is-flex-wrap-wrap is-justify-content-space-evenly">
          { results.map((item) => <CardRender key={ item.id } results={ item } />)}
        </div>
      </div>
    );
  }
}

CardList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};
