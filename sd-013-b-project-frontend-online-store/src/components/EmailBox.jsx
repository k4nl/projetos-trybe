import React from 'react';
import { MdEmail } from 'react-icons/md';
import PropTypes from 'prop-types';

export default class EmailBox extends React.Component {
  render() {
    const { getEmail } = this.props;
    return (
      <div className="is-flex input-border is-align-items-center">
        <MdEmail size="1.5em" className="is-flex ml-2" />
        <input
          placeholder="Email"
          type="email"
          id="email"
          onChange={ getEmail }
          required
          className="p-2"
        />
      </div>
    );
  }
}

EmailBox.propTypes = {
  getEmail: PropTypes.func.isRequired,
};
