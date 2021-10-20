import React from 'react';
import PropTypes from 'prop-types';

export default class Categories extends React.Component {
  render() {
    const { categories: { name, id } } = this.props;
    return (
      <div className="field">
        <label
          className="label"
          key={ id }
          htmlFor={ id }
        >
          { name }
          <input
            className="radio ml-1"
            type="radio"
            data-testid="category"
            id={ id }
            key={ id }
            value={ name }
            name="category"
          />
        </label>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.objectOf(PropTypes.string).isRequired,
};
