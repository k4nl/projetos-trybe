import React from 'react';
import PropTypes from 'prop-types';

export default class EvaluationCard extends React.Component {
  render() {
    const { email, comment, rating } = this.props;
    return (
      <div className="has-background-white my-1 ml-6 p-3 is-inline-block">
        <p className="title is-6 is-uppercase">{ email }</p>
        <p className="title is-6 is-uppercase">{ ` Nota: ${rating}` }</p>
        <p className="subtitle is-6 mt-1">{ comment }</p>
      </div>
    );
  }
}

EvaluationCard.propTypes = {
  email: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
};
