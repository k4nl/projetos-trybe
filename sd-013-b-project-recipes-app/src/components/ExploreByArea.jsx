import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from './Footer';

class ExploreByArea extends Component {
  render() {
    const { foodData, handleChange } = this.props;
    return (
      <div>
        <select onChange={ handleChange } data-testid="explore-by-area-dropdown">
          <option value="All" data-testid="All-option">All</option>
          { foodData.map(({ strArea }, index) => (
            <option
              key={ index }
              value={ strArea }
              data-testid={ `${strArea}-option` }
            >
              { strArea }
            </option>
          ))}
        </select>
        <Footer />
      </div>
    );
  }
}

ExploreByArea.propTypes = {
  foodData: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
};

const mapStateToProps = ({ foodData }) => ({
  foodData: foodData.foodArea,
});

export default connect(mapStateToProps)(ExploreByArea);
