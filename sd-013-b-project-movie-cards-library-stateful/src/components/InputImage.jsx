import React from 'react';
import PropTypes from 'prop-types';

class InputImage extends React.Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <label data-testid="image-input-label" htmlFor="imagem-input">
          Imagem
          <input
            value={ value }
            onChange={ onChange }
            data-testid="image-input"
            name="imagePath"
            type="text"
            id="imagePath"
          />
        </label>
      </div>
    );
  }
}

export default InputImage;

InputImage.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
