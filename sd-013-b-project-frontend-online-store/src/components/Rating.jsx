import React from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default class Rating extends React.Component {
  render() {
    const { getRating } = this.props;

    return (
      <div className="is-flex input-border is-align-items-center">
        <FaStar size="1.5em" className="is-flex ml-2" />
        <input
          placeholder="Nota"
          type="number"
          id="rating"
          step={ 0.5 }
          min={ 0 }
          max={ 5 }
          onChange={ getRating }
          required
          className="p-2"
        />
      </div>
    );
  }
}

Rating.propTypes = {
  getRating: PropTypes.func.isRequired,
};
