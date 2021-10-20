import React from 'react';
import PropTypes from 'prop-types';

export default class CommentBox extends React.Component {
  render() {
    const { getComment } = this.props;

    return (
      <div className="is-flex input-border">
        <textarea
          id="product-detail-evaluation"
          data-testid="product-detail-evaluation"
          cols="10"
          rows="4"
          placeholder="Mensagem (opcional)"
          onChange={ getComment }
          className="p-2"
        />
      </div>
    );
  }
}

CommentBox.propTypes = {
  getComment: PropTypes.func.isRequired,
};
