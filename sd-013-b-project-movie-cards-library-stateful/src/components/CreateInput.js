import React from 'react';
import PropTypes from 'prop-types';

class createInput extends React.Component {
  render() {
    const { input: {
      tag,
      key,
      id,
      type,
      label,
      name,
      checked,
    }, value, onChange } = this.props;
    return (
      <label
        key={ key }
        htmlFor={ id }
        data-testid={ `${type}-label` }
      >
        {label}
        {React.createElement(tag,
          {
            type,
            name,
            'data-testid': id,
            value: value(type),
            onChange,
            checked,
          })}
      </label>
    );
  }
}
export default createInput;

createInput.propTypes = {
  input: PropTypes.string.isRequired,
  value: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
